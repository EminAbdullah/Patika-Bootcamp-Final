import React from 'react';
import { Title, Text, Center } from '@mantine/core';
import './CategoriesSection.css';

const categoriesData = [
  { title: 'Marvel', image: 'https://c4.wallpaperflare.com/wallpaper/474/347/805/other-wallpaper-preview.jpg' },
  { title: 'DC Comics', image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9ce75266-f939-47b3-a590-80b1285c0365/dg7g77f-82b62efd-c08b-4d7c-b22b-d089a77e11c1.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzljZTc1MjY2LWY5MzktNDdiMy1hNTkwLTgwYjEyODVjMDM2NVwvZGc3Zzc3Zi04MmI2MmVmZC1jMDhiLTRkN2MtYjIyYi1kMDg5YTc3ZTExYzEuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.aKBHu7tHUCHuJ72TJE2jqajvRi32YzV0dCiE7UjpumI' },
  { title: 'Gaming', image: 'https://static.vecteezy.com/system/resources/previews/002/144/780/non_2x/gaming-banner-for-games-with-glitch-effect-neon-light-on-text-illustration-design-free-vector.jpg' },
  { title: 'Star Wars', image: 'https://external-preview.redd.it/8t2Ke2zdrHx669tFR1UzcOvELcpRPMUsPUyMLVB0EN0.jpg?auto=webp&s=5c7efaff25d7b9e5071ee25e8f01f3e7fc160196' },
  { title: 'Anime & Manga', image: 'https://i.pinimg.com/736x/69/ab/d7/69abd72ca0330b2a70e2c973f2c99c9e.jpg' },
 
  { title: 'Harry Potter', image: 'https://i.pinimg.com/736x/ee/c9/ba/eec9bab0ec633f37a2ed1dba33b5af89.jpg' },
  { title: 'Transformers', image: 'https://textpro.me/uploads/worigin/2021/07/30/create-a-transformer-text-_effect-online6103a76c3adef_17882a768a428bd8acf29a88801a6d5b.jpg' },
  { title: 'Lord of the Rings', image: 'https://i.pinimg.com/564x/77/2c/94/772c9494d7255ece131ae05a079410f4.jpg' },
 
];

function CategoriesSection() {
  return (
    <>
      <div className="category-container">
        <Title mt={30} order={2} align="center" className="category-header">
          SHOP BY CATEGORY
        </Title>
        <Center>
          <div className="category-scroll-container">
            {categoriesData.map((category) => (
              <div
                key={category.title}
                className="category-leaf"
                style={{ backgroundImage: `url(${category.image})` }}
              >
                <div className="overlay">
                  <Text weight={600} size="md" className="category-leaf-title">
                    {category.title}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </Center>
      </div>
    </>
  );
}

export default CategoriesSection;
