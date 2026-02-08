/**
 * Test script pour diagnostiquer le problème d'encodage website_url
 */

const API_BASE_URL = 'http://localhost:3001/api/proxy/adhesions';

async function testWebsiteUrlSubmission() {
  console.log('\n=========================');
  console.log('🧪 TEST: Website URL Encoding');
  console.log('=========================\n');

  // Test data avec une URL propre
  const testPayload = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '+225701234567',
    typeMembreId: 'test-id',
    website_url: 'https://www.idaroot.com/', // Clean URL
  };

  console.log('📤 Payload avant envoi:');
  console.log('  website_url:', testPayload.website_url);
  console.log('  Type:', typeof testPayload.website_url);
  console.log('  Longueur:', testPayload.website_url.length);
  console.log('  Caractères:', testPayload.website_url.split('').map((c, i) => `[${i}]=${c} (${c.charCodeAt(0)})`).join(', '));

  const jsonString = JSON.stringify(testPayload);
  console.log('\n📝 JSON.stringify():');
  console.log('  JSON:', jsonString);
  console.log('  website_url en JSON:', jsonString.match(/"website_url":"[^"]*"/)[0]);

  try {
    console.log('\n🌐 Envoi de la requête POST...');
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonString,
    });

    console.log('\n📥 Réponse reçue:');
    console.log('  Status:', response.status);
    
    const responseData = await response.json();
    console.log('  Response body:', JSON.stringify(responseData, null, 2));

    if (responseData && responseData.website_url) {
      console.log('\n✅ RÉSULTAT:');
      console.log('  website_url reçu par le serveur:', responseData.website_url);
      console.log('  Match avec original?', responseData.website_url === testPayload.website_url ? '✅ OUI' : '❌ NON');
      
      // Analyser les différences
      if (responseData.website_url !== testPayload.website_url) {
        console.log('\n🔍 DIFFÉRENCES DÉTECTÉES:');
        console.log('  Original:  ' + testPayload.website_url);
        console.log('  Reçu:      ' + responseData.website_url);
        
        // Vérifier si c'est HTML-encoded
        if (responseData.website_url.includes('&') && responseData.website_url.includes(';')) {
          console.log('  ⚠️ Contient des entités HTML');
        }
      }
    }
  } catch (error) {
    console.error('\n❌ Erreur lors de l\'envoi:', error.message);
  }
}

// Attendre un peu avant de tester (le serveur doit démarrer)
console.log('Attente du serveur...');
setTimeout(() => {
  testWebsiteUrlSubmission();
}, 2000);
