const axios = require('axios');
const { host, key, oauth, token, i50, i60 } = require('../config');

const trello = axios.create({
  baseURL: 'https://api.trello.com/1/webhooks',
  params: {
    key,
    token,
    oauth,
  },
});

const addWebhook = async (callbackURL, idModel) => {
  try {
    const { data } = await trello.post('/', {}, {
      params: {
        callbackURL,
        idModel,
      },
    });
    console.log('WEBHOOK CREATED SUCCESFULLY WITH \n', data);
    return data;
  } catch (err) {
    console.log('WEBHOOK CREATED FAILED WITH \n', err);
  }
};

const deleteWebhook = async (idModel) => {
  try {
    const { data } = await trello.delete(`/${idModel}`);
    console.log('WEBHOOKED DELETED SUCCESFULLY FOR \n', idModel);
    return data;
  } catch (err) {
    console.log('DELETE WEBHOOK FAILED WITH \n', err.response.data);
  }
};

const createBoardWebhook = async (req, res) => {
  try {
    // console.log(req);
    const data1 = await addWebhook(`${host}/api/check`, i50);
    const data2 = await addWebhook(`${host}/api/check`, i60);
    res.status(200).json([data1, data2]);
  } catch (err) {
    console.log('CREATE BOARD HOOK FAILED');
    res.sendStatus(401);
  }
};

const temp = async (req, res) => {
  try {
    const data = await deleteWebhook('603fbc3bbe615937e624bc9c');
    res.status(200).json([data]);
  } catch (err) {
    console.log('TEMP FAILED');
  }
};

// const createCardWebhook = (req, res) => {
  
// };

module.exports = {
  createBoardWebhook,
  temp,
};
