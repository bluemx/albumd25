
import PocketBase from 'pocketbase';



const pbapi = 'https://albumdigital.up.railway.app';

const pb = new PocketBase(pbapi);

const superuserToken = ref(null);
let superuserTokenPromise = null;




export async function getSuperuserToken() {
    if (superuserToken.value) return superuserToken.value;
    if (superuserTokenPromise) return superuserTokenPromise;
    superuserTokenPromise = (async () => {
        try {
            const adminEmail = import.meta.env.VITE_PB_ADMIN_EMAIL;
            const adminPassword = import.meta.env.VITE_PB_ADMIN_PASSWORD;
            const authData = await pb.admins.authWithPassword(adminEmail, adminPassword);
            superuserToken.value = authData.token;
            return superuserToken.value;
        } catch (error) {
            console.error('Authentication failed:', error);
            throw error;
        } finally {
            superuserTokenPromise = null;
        }
    })();
    return superuserTokenPromise;
}




async function setAuthHeader() {
  const token = await getSuperuserToken();
  pb.authStore.save(token, null, 'admin');
}





async function getConfiguration() {
    await setAuthHeader();
    const response = await pb.collection('configurations').getFirstListItem();
    if (Array.isArray(response.bgs)) {
        const bgsObj = {};
        for (const bg of response.bgs) {
            const key = bg.split('_')[0];
            bgsObj[key] = pbapi+'/api/files/'+response.collectionId+'/'+response.id+'/'+bg;
        }
        response.bgs = bgsObj;
    }
    return response;
}

async function getCards() {
    await setAuthHeader();
    const response = await pb.collection('cards').getFullList();
    return response.map(card => {
        return {
            ...card,
            imageUrl: pbapi+'/api/files/'+card.collectionId+'/'+card.id+'/'+card.front,
            animadoUrl: (card.animado ? (pbapi+'/api/files/'+card.collectionId+'/'+card.id+'/'+card.animado) : null),
            vintageUrl: (card.vintage ? (pbapi+'/api/files/'+card.collectionId+'/'+card.id+'/'+card.vintage) : null)
        };
    });
}

async function getUserCards(userId) {
    await setAuthHeader();
    try {
        const response = await pb.collection('usercards').getFullList('user="'+userId+'"', {
            expand: 'card_mutation'
        });

        const userCardsObj = {};
        for (const card of response) {
            //TODO: Use normal object, don't remap. 
            userCardsObj[card.card_identifier] = {
                /*
                mutation:{
                    id: card.card_mutation,
                    name: card.expand?.card_mutation?.name || '',
                    multiply: card.expand?.card_mutation?.multiply || 1,
                },
                */
                identifier: card.card_identifier,
                mutationId: card.card_mutation,
                inalbum: card.inalbum,
            }
        }
        return userCardsObj;
       
    } catch (e) {
        console.log('No usercards found for user:', userId);
        return null;
    }
}

async function getChallenges() {
    await setAuthHeader();
    const response = await pb.collection('challenges').getFullList();
    return response;
}

async function getUser(userId) {
    await setAuthHeader();
    try {
        const response = await pb.collection('users').getOne(userId);
        return {
            ...response,
            avatarUrl: pbapi+'/api/files/'+response.collectionId+'/'+response.id+'/'+response.avatar
        };
    } catch (e) {
        console.log('No user found for userId:', userId);
        return null;
    }
}


async function getMutations() {
    await setAuthHeader();
    const response = await pb.collection('mutations').getFullList();
    return response;
}

export {getConfiguration, getCards, getUserCards, getUser, getChallenges, getMutations};