/**
 * Test pour voir comment les données website_url sont retournées par l'API
 */

async function testExistingData() {
  console.log('\n=========================');
  console.log('🧪 TEST GET: Vérifier l\'encodage des données existantes');
  console.log('=========================\n');

  const apiUrl = 'http://localhost:3001/api/proxy/adhesions/for-site-web?limit=5';

  console.log('📤 Appel GET:', apiUrl);

  try {
    const response = await fetch(apiUrl);
    
    console.log('\n📥 Réponse:');
    console.log('  Status:', response.status);
    
    const responseData = await response.json();
    
    if (Array.isArray(responseData)) {
      // It returned an array directly
      const itemsWithWebsite = responseData.filter(item => item.website_url);
      
      console.log(`\n✅ Données reçues: ${responseData.length} items total, ${itemsWithWebsite.length} avec website_url`);
      
      if (itemsWithWebsite.length > 0) {
        console.log('\n🔍 Exemples de website_url reçues:');
        itemsWithWebsite.slice(0, 3).forEach((item, idx) => {
          console.log(`\n  Item ${idx + 1}:`);
          console.log(`    Valeur: ${item.website_url}`);
          console.log(`    Contient "&"?: ${item.website_url.includes('&')}`);
          console.log(`    Contient "&#x"?: ${item.website_url.includes('&#x')}`);
          console.log(`    Contient "&amp;"?: ${item.website_url.includes('&amp;')}`);
          
          // Try to decode
          if (item.website_url.includes('&amp;') || item.website_url.includes('&#x2F;')) {
            const decoded = item.website_url
              .replace(/&amp;/g, '&')
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>')
              .replace(/&quot;/g, '"')
              .replace(/&#x2F;/g, '/')
              .replace(/&#47;/g, '/');
            console.log(`    Décodée: ${decoded}`);
          }
        });
      }
    } else if (responseData.data && Array.isArray(responseData.data)) {
      // It returned {data: [...]}
      const itemsWithWebsite = responseData.data.filter(item => item.website_url);
      
      console.log(`\n✅ Données reçues: ${responseData.data.length} items total, ${itemsWithWebsite.length} avec website_url`);
      
      if (itemsWithWebsite.length > 0) {
        console.log('\n🔍 Exemples de website_url reçues:');
        itemsWithWebsite.slice(0, 3).forEach((item, idx) => {
          console.log(`\n  Item ${idx + 1}:`);
          console.log(`    Valeur: ${item.website_url}`);
          console.log(`    Encodée?: ${item.website_url.includes('&')}`);
        });
      }
    } else {
      console.log('\nRéponse complète (premiers 500 chars):');
      console.log(JSON.stringify(responseData, null, 2).substring(0, 500));
    }
  } catch (error) {
    console.error('\n❌ Erreur:', error.message);
  }
}

testExistingData();
