/**
 * Test direct contre le backend externe pour vérifier l'encodage
 */

const EXTERNAL_API_URL = 'https://api.cpupme.com/api/adhesions';

async function testDirectBackend() {
  console.log('\n=========================');
  console.log('🧪 TEST DIRECT: Backend externe');
  console.log('=========================\n');

  const testPayload = {
    name: 'Test Direct User',
    email: 'testdirect@example.com',
    phone: '+225701234567',
    typeMembreId: '67568cbfe24ca20008e0bfe3', // Valid ID from the system
    website_url: 'https://www.idaroot.com/', // Clean URL
  };

  console.log('📤 Envoi DIRECT au backend:');
  console.log('  URL:', EXTERNAL_API_URL);
  console.log('  website_url:', testPayload.website_url);

  try {
    const response = await fetch(EXTERNAL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testPayload),
    });

    console.log('\n📥 Réponse du backend:');
    console.log('  Status:', response.status);
    
    const responseData = await response.json();
    
    if (responseData.data && responseData.data.website_url) {
      console.log('\n✅ RÉSULTAT:');
      console.log('  URL envoyée:', testPayload.website_url);
      console.log('  URL reçue du backend:', responseData.data.website_url);
      console.log('  Match?', responseData.data.website_url === testPayload.website_url ? '✅ OUI' : '❌ NON');
      
      if (responseData.data.website_url !== testPayload.website_url) {
        console.log('\n🔍 DIFFÉRENCES:');
        console.log('  Encodée?', responseData.data.website_url.includes('&') ? '⚠️ OUI' : 'Non');
      }
    } else {
      console.log('\n📊 Réponse complète:', JSON.stringify(responseData, null, 2).substring(0, 1000));
    }
  } catch (error) {
    console.error('\n❌ Erreur lors de l\'appel direct:', error.message);
  }
}

testDirectBackend();
