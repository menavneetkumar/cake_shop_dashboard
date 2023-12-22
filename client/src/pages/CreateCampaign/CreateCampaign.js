import React, { useEffect, useState, useRef } from 'react';
import './CreateCampaign.css';
import StepProgressBar from 'react-step-progress';
import 'react-step-progress/dist/index.css';
import CampaignCategory from '../../components/CampaignCategory/CampaignCategory';
import CampaignProduct from '../../components/CampaignProduct/CampaignProduct';
import CampaignSettings from '../../components/CampaignSettings/CampaignSettings';
import CampaignPreview from '../../components/CampaignPreview/CampaignPreview';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';



const CreateCampaign = () => {
  const toast = useToast();
  const [platform, setPlatform] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [budget, setBudget] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [coords, setCoords] = useState({});
  const [location, setLocation] = useState('');
  const clicks = Math.round(Math.random() * 1000);
  const status = 'Live now';

  const [redirect, setRedirect] = useState(true);
  const navigate = useNavigate();

  const handlePlatform = (platform) => {
    setPlatform(platform);
  };

  const handleProduct = (title, image) => {
    console.log('title: ' + title);
    setTitle(title);
    setImage(image);
  };

  const step1Content = <CampaignCategory handlePlatform={handlePlatform} />;
  const step2Content = <CampaignProduct handleProduct={handleProduct} />;
  const step3Content = (
    <CampaignSettings
      setDateRange={setDateRange}
      setCoords={setCoords}
      setBudget={setBudget}
    />
  );
  const step4Content = <CampaignPreview />;

  useEffect(() => {
    const result = async () => {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords.lat}&longitude=${coords.lng}&localityLanguage=en`
      );
      const data = await response.json();
      setLocation(data.city);
    };
    result();
  }, [coords]);

  const curPlatform = useRef(platform);
  curPlatform.current = platform;
  const step1Validator = (platform) => {
    if (!platform) {
      toast({
        title: 'Uh oh!',
        description: 'Select a campaign type to proceed.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    return platform;
  };

  const curTitle = useRef(title);
  curTitle.current = title;
  function step2Validator(title) {
    if (!title) {
      toast({
        title: 'Uh oh!',
        description: 'Select a product to proceed.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    return title;
  }

  function step3Validator() {
    return true;
  }

  const onFormSubmit = async () => {
    const campaign = {
      title,
      image,
      dateRange,
      clicks,
      budget: `INR ${budget.toLocaleString()}`,
      location,
      platform,
      status,
    };

    console.log('campaign', campaign);

    const response = await fetch('https://cake-shop-k7ml.onrender.com/api/campaigns/', {
      method: 'POST',
      body: JSON.stringify(campaign),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      setRedirect(false);
      toast({
        title: 'Something went wrong!',
        description: 'Make sure you complete all the steps.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }

    toast({
      title: 'Campaign created successfully.',
      description: 'Your campaign is up and running!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    redirect && navigate('/');
  };

  return (
    <div className='create-campaign-page'>
      <div className='page-header'>
        <p className='page-title'>Your Ad Campaign</p>
        <p className='page-subtitle'>Launch your ad in just 4 easy steps </p>
      </div>
      <StepProgressBar
        startingStep={0}
        onSubmit={onFormSubmit}
        nextBtnName={'Continue'}
        previousBtnName={'Go Back'}
        submitBtnName={'Start campaign'}
        steps={[
          {
            label: 'What you want',
            name: 'step 1',
            content: step1Content,
            validator: () => step1Validator(curPlatform.current),
          },
          {
            label: 'Choose product',
            name: 'step 2',
            content: step2Content,
            validator: () => step2Validator(curTitle.current),
          },
          {
            label: 'Campaign settings',
            name: 'step 3',
            content: step3Content,
            validator: step3Validator,
          },
          {
            label: 'Ready to go',
            name: 'step 4',
            content: step4Content,
          },
        ]}
      />
    </div>
  );
};

export default CreateCampaign;
