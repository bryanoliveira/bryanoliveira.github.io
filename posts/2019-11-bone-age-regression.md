---
title: 'Bone Age Regression'
slug: '2019-11-10-bone-age-regression'
date: '2019-11-10'
urls:
    [
        {
            cta: 'Code',
            url: 'https://github.com/bryanoliveira/bone-age-regression',
        },
    ]
type: 'Deep Learning'
tags: ['project', 'ai', 'deeplearning']
image: '/img/bone.png'
description: 'This is my code for the <a href="https://www.kaggle.com/c/bone-age-regression">I2A2 Bone Age Regression competition</a>. I learned a lot by building this pipeline from scratch and experimenting with different model architectures and optimizers. This was my first end-to-end image regression model, and it was very nice seeing my theoretical knowledge work in practice.'
---

This is my code for the [I2A2 Bone Age Regression competition](https://www.kaggle.com/c/bone-age-regression). I learned a lot by building this pipeline from scratch and experimenting with different model architectures and optimizers. This was my first end-to-end image regression model, and it was very nice seeing my theoretical knowledge work in practice.

This competition was inspired by [RSNA's Bone Age challenge](https://www.kaggle.com/kmader/rsna-bone-age), in which given hand X-ray images, the model should predict the patient's bone age.

<div align="center">
    <img class="text-img mw-33" src="https://github.com/bryanoliveira/bone-age-regression/raw/master/docs/ex1.png">
    <img class="text-img mw-33" src="https://github.com/bryanoliveira/bone-age-regression/raw/master/docs/ex2.png">
    <img class="text-img mw-33" src="https://github.com/bryanoliveira/bone-age-regression/raw/master/docs/ex3.png">
</div>

> X-ray images provided in the competition's dataset.

My final solution used a [ResNet50](https://arxiv.org/abs/1512.03385) architecture, a [Rectified Adam](https://arxiv.org/abs/1908.03265) optimizer and geometric data augmentations. This model achieved a Mean Average Error of 13.2 after 20 epochs of training, which I believe could be improved given more training time and a better preprocessing pipeline (e.g. using object detection to segment the hands and normalizing hand rotation). Unfortunately, I didn't save all the hyperparameters I experimented with (neither their results), but you'll find the ones I used for my last submission in the code.

I used [tensorboard](https://www.tensorflow.org/tensorboard) to log the training curves and [tqdm](https://github.com/tqdm/tqdm) to track progress. I also used [FCMNotifier](https://github.com/bryanlincoln/fcm-notifier), a tool I made to send logs as notifications to my phone.

## Requirements

See [requirements.txt](https://github.com/bryanlincoln/bone-age-regression/blob/master/requirements.txt).

## Usage

-   Download the requirements with `pip install -r requirements.txt`
-   Download the dataset and sample submission with `sh download_data.sh`. You may need to log in with your Kaggle account in order to do it.
-   Train the ResNet50 model with `python boneage.py`
-   Try different models and hyperparameters by editing the training script or use the `boneage.ipynb` notebook to do it interactively.

## Credits

I used the vision models already [implemented in torchvision](https://github.com/pytorch/vision/tree/master/torchvision/models) with slight changes. You can try other torchvision models by adding the `in_channels` parameter to generalize the number of input channels since torchvision models work with RGB images.
