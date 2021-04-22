const axios = require('axios');
// fix console log issue in firebase log
require('firebase-functions/lib/logger/compat');

const { key, oauth, token, i50, i60, students } = require('../config');

const trello = axios.create({
  baseURL: 'https://api.trello.com/1',
  params: {
    key,
    token,
    oauth,
  },
});

const getBoard = async (boardId) => {
  try {
    const { data } = await trello.get(`/board/${boardId}`);
    return data;
  } catch (err) {
    console.log('GET BOARD FAILED WITH \n', err);
  }
};

const checkBoard = async (req, res) => {
  try {
    const data1 = await getBoard(i50);
    const data2 = await getBoard(i60);
    res.status(200).json([data1, data2]);
  } catch (err) {
    console.log('CHECK BOARD FAILED');
  }
};

const getBoardActions = async (boardId) => {
  try {
    const { data } = await trello.get(`/boards/${boardId}/actions`);
    return data;
  } catch (err) {
    console.log('GET BOARD ACTION FAILED WITH \n', err);
  }
};

const getBoardCard = async (boardId) => {
  try {
    const { data } = await trello.get(`/boards/${boardId}/cards`);
    return data;
  } catch (err) {
    console.log('GET BOARD CARD FAILED WITH \n', err);
  }
};

const getLatestBoardCard = async (boardId) => {
  try {
    const res = await getBoardCard(boardId);
    const card = await res.reduce(
      (acc, e) => {
        return (e.due && Date.parse(e.due) > Date.parse(acc.due))
          ? e
          : acc;
      },
      { due: new Date(0) },
    );
    return card;
  } catch (err) {
    console.log('GET LATEST BOARD CARD FAILED WITH \n', err);
  }
};

const getCardActions = async (cardId) => {
  try {
    const { data } = await trello.get(`/cards/${cardId}/actions`);
    return data;
  } catch (err) {
    console.log('GET LATEST CARD COMMENT FAILED WITH ', err);
  }
};

const getLatestCardComment = async (cardId) => {
  try {
    const data = await getCardActions(cardId);
    return data.filter(({ type }) => type === 'commentCard');
  } catch (err) {
    console.log('GET LATEST CARD COMMENT FAILED WITH ', err);
  }
};

const postCommentToCard = async (cardId, text) => {
  try {
    const { data } = await trello.post(`/cards/${cardId}/actions/comments`, {}, {
      params: {
        text,
      },
    });

    return data;
  } catch (err) {
    console.log('POST COMMENT FAILED WITH ', err);
  }
};

const checkHw = async (req, res) => {
  const handleCheck = async (text, cardId, studentId, fullName) => {
    students.forEach(async (std) => {
      if (std.id === studentId && text.includes('https')) {
        await postCommentToCard(cardId, `@${std.name} Homework all done`);
        console.log(`${fullName} checked`);
      }
    });
    return null;
  };

  try {
    const { action } = req.body;
    if (action.type !== 'commentCard') {
      return res.sendStatus(200);
    }
    const { data, memberCreator } = action;
    const { text, card } = data;
    const { id, fullName } = memberCreator;

    const result = await handleCheck(text, card.id, id, fullName);
    res.status(200).json(result);
  } catch (err) {
    console.log('CHECK HW FAILED WITH ', err);
  }
};

module.exports = {
  checkHw,
  checkBoard,
};
