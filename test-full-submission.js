/**
 * Test complet avec données valides pour tester le fix
 */

async function testFullSubmission() {
  console.log('\n=========================');
  console.log('🧪 TEST COMPLET: Submission avec données valides');
  console.log('=========================\n');

  // Récupérer d'abord un typeMembreId valide
  const typesResponse = await fetch('http://localhost:3001/api/proxy/type-membres/for-site-web');
  const typesData = await typesResponse.json();
  
  // La réponse peut être imbriquée, gérer les deux cas
  let types = Array.isArray(typesData) ? typesData : (typesData.data?.data || typesData.data || []);
  
  if (!Array.isArray(types) || types.length === 0) {
    console.error('❌ Impossible de récupérer les types de membres');
    console.log('Response structure:', JSON.stringify(typesData).substring(0, 200));
    return;
  }
  
  const typeMembreId = types[0].id;
  console.log('✅ typeMembreId valide trouvé:', typeMembreId);

  const testPayload = {
    name: 'Test Complet User',
    email: 'testcomplet@idaroot.com',
    phone: '+225701234567',
    typeMembreId,
    website_url: 'https://www.idaroot.com/', // Clean URL
  };

  console.log('\n📤 Envoi du formulaire:');
  console.log('  website_url:', testPayload.website_url);

  try {
    const response = await fetch('http://localhost:3001/api/proxy/adhesions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testPayload),
    });

    console.log('\n📥 Réponse du serveur:');
    console.log('  Status:', response.status);
    
    // Lire d'abord le raw text
    const rawText = await response.text();
    console.log('\n🔍 RAW TEXT (premiers 2000 chars):');
    console.log(rawText.substring(0, 2000));
    
    // Maintenant parser en JSON
    const responseData = JSON.parse(rawText);
    
    if (responseData.data && responseData.data.data && responseData.data.data.website_url) {
      const websiteUrl = responseData.data.data.website_url;
      console.log('\n✅ RÉSULTAT FINAL:');
      console.log('  URL envoyée:', testPayload.website_url);
      console.log('  URL reçue (brute):', websiteUrl);
      console.log('  Type:', typeof websiteUrl);
      console.log('  Longueur:', websiteUrl.length);
      console.log('  Char codes:', websiteUrl.split('').slice(5, 15).map((c, i) => `[${i}]=${c}(${c.charCodeAt(0)})`).join(' '));
      
      // Vérifier si c'est bien décodé
      const isClean = websiteUrl === 'https://www.idaroot.com/' || websiteUrl === 'https://www.idaroot.com';
      
      if (isClean) {
        console.log('  ✅ URL CORRECTEMENT DÉCODÉE!');
      } else {
        console.log('  ❌ URL PAS CORRECTEMENT DÉCODÉE');
        console.log('     Contient "&amp;"?:', websiteUrl.includes('&amp;'));
        console.log('     Contient "&#x"?:', websiteUrl.includes('&#x'));
      }
    } else {
      console.log('\n❌ Pas de website_url dans la réponse');
    }
  } catch (error) {
    console.error('\n❌ Erreur:', error.message);
  }
}

testFullSubmission();
