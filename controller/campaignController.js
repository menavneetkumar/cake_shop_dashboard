const Campaign = require('../models/campaignModel');
const mongoose = require('mongoose');

const getCampaigns = async (req, res) => {
  const campaigns = await Campaign.find({}).sort({ createdAt: -1 });
  res.status(200).json(campaigns);
};

const getCampaign = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: 'Campaign not found' });
  }

  const campaign = await Campaign.findById(id);
  if (!campaign) {
    return res.status(404).json({ error: 'Campaign not found' });
  }
  res.status(200).json(campaign);
};

const createCampaign = async (req, res) => {
  const {
    active,
    title,
    image,
    dateRange,
    clicks,
    budget,
    location,
    platform,
    status,
  } = req.body;
  try {
    const campaign = await Campaign.create({
      active,
      title,
      image,
      dateRange,
      clicks,
      budget,
      location,
      platform,
      status,
    });
    res.status(200).json(campaign);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const deleteCampaign = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Campaign not found' });
  }

  const campaign = await Campaign.findOneAndDelete({ _id: id });
  if (!campaign) {
    return res.status(404).json({ error: 'Campaign not found' });
  }
  res.status(200).json(campaign);
};

const updateCampaign = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Campaign not found' });
  }

  const campaign = await Campaign.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );
  if (!campaign) {
    return res.status(404).json({ error: 'Campaign not found' });
  }
  res.status(200).json(campaign);
};

module.exports = {
  getCampaigns,
  getCampaign,
  createCampaign,
  deleteCampaign,
  updateCampaign,
};
