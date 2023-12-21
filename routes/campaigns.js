const express = require('express');
const router = express.Router();

const {
  getCampaigns,
  getCampaign,
  createCampaign,
  deleteCampaign,
  updateCampaign,
} = require('../controller/campaignController');

router.get('/', getCampaigns);

router.get('/:id', getCampaign);

router.post('/', createCampaign);

router.delete('/:id', deleteCampaign);

router.patch('/:id', updateCampaign);

module.exports = router;
