
/**
 * Test en utilisant fetch contre le navigate client Next.js
 * pour voir si la normalisation s'applique
 */

async function testViaNextJsClient() {
  console.log('\n=========================');
  console.log('🧪 TEST: Via Next.js client (fetch)');
  console.log('=========================\n');

  // Récupérer d'abord un typeMembreId valide (via le client)
  const typesResponse = await fetch('http://localhost:3001/api/proxy/type-membres/for-site-web');
  const typesData = await typesResponse.json();
  let types = Array.isArray(typesData) ? typesData : (typesData.data?.data || typesData.data || []);
  
  const typeMembreId = types[0].id;
  console.log('✅ typeMembreId:', typeMembreId);

  const testPayload = {
    name: 'Test Normalization User',
    email: 'testnorm@idaroot.com',
    phone: '+225701234567',
    typeMembreId,
    website_url: 'https://www.idaroot.com/',
  };

  console.log('\n📤 Envoi via POST:');
  
  try {
    const response = await fetch('/api/proxy/adhesions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testPayload),
    });

    const responseData = await response.json();
    const websiteUrl = responseData.data?.data?.website_url;
    
    console.log('\n✅ Résultat:');
    console.log('  URL envoyée:', testPayload.website_url);
    console.log('  URL reçue:', websiteUrl);
    console.log('  Match?', websiteUrl === 'https://www.idaroot.com/' ? '✅ YES' : '❌ NO');
    
    if (websiteUrl && websiteUrl.includes('&')) {
      console.log('  ⚠️  Contient toujours "&" - normalisation n\'a pas fonctionné');
    }
  } catch (error) {
    console.error('\n❌ Erreur:', error.message);
  }
}

testViaNextJsClient();
