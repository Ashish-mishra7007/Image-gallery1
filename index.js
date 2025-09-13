const galleryData = [
            {
                src: "https://img.freepik.com/premium-photo/alpine-meadow-atmospheric-landscape-majestic-nature-scenic-mountainscape-wonderful-wild-scenery_158388-1648.jpg",
                alt: "Majestic mountain landscape with snow-capped peaks and crystal clear alpine lake at sunset",
                category: "nature",
                title: "Alpine Majesty"
            },
            {
                src: "https://i1.pickpik.com/photos/782/1023/693/the-urban-landscape-kaohsiung-metropolitan-areas-taiwan-preview.jpg",
                alt: "Urban cityscape of downtown skyscrapers with glowing lights during blue hour",
                category: "urban",
                title: "City Lights"
            },
            {
                src: "https://plus.unsplash.com/premium_photo-1700590389658-67398e9a03f2?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXQlMjBsYW5kc2NhcGV8ZW58MHx8MHx8fDA%3D",
                alt: "Portrait of a woman with flowing hair against a golden hour backdrop",
                category: "portrait",
                title: "Golden Hour Portrait"
            },
            {
                src: "https://wttc.org/getContentAsset/c522e57b-40e8-4e50-8fc3-71a325e49ddb/489c4c4e-cfe8-42ba-91b1-27fe878007dd/Header-PR-image-Global-Travel-Tourism-is-Strong-Despite.webp?language=en",
                alt: "Ancient temple ruins surrounded by lush tropical jungle and misty mountains",
                category: "travel",
                title: "Ancient Sanctuary"
            },
            {
                src: "https://static.vecteezy.com/system/resources/thumbnails/055/613/995/small/majestic-african-lion-at-golden-sunset-savannah-grassland-king-wild-warm-pride-image-mammal-photo.jpg",
                alt: "Wildlife photography of a lion resting on savannah grasslands at golden hour",
                category: "nature",
                title: "King of forest"
            },
            {
                src: "https://images.stockcake.com/public/8/5/e/85e87676-654a-47fd-b0cc-6744563e6453_large/urban-architectural-marvel-stockcake.jpg",
                alt: "Modern architecture building with geometric shapes and reflective glass surfaces",
                category: "urban",
                title: "Architectural Marvel"
            },
            {
                src: "https://i.ytimg.com/vi/dXM6i5-sdVg/maxresdefault.jpg",
                alt: "Expressive black and white portrait of an elderly person with deep wrinkles",
                category: "portrait",
                title: "Timeless Wisdom"
            },
            {
                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlgNi3IPUx_tNtEkeksM9RtbouWW5xFEPmVA&s",
                alt: "Colorful street market in a foreign country with vibrant spices and textiles",
                category: "travel",
                title: "Evening City Market"
            },
            {
                src: "https://thumbs.dreamstime.com/b/beautiful-amazing-cosmos-flower-field-landscape-sunset-nature-wallpaper-background-179698760.jpg",
                alt: "Waterfall in a dense forest with lush green vegetation and misty atmosphere",
                category: "nature",
                title: "Forest Cascade"
            },
            {
                src: "https://media.gettyimages.com/id/2196059980/video/hyperlapse-smart-city-wireless-network-signal-data-transmission-high-speed-and-connection-of.jpg?s=640x640&k=20&c=muHrishp8r38d9uFoJZIfcFvRObUWuD_2HmHBYy2HOA=",
                alt: "Nighttime city traffic with long exposure light trails and illuminated buildings",
                category: "urban",
                title: "Urban Flow Stock"
            },
            {
                src: "https://cruiseindustrynews.com/wp-content/uploads/2023/08/Ocean_Majesty_Schiff_WS.jpg",
                alt: "Studio portrait of a dancer in motion with dramatic lighting and flowing costume",
                category: "portrait",
                title: "Ocean Majesty"
            },
            {
                src: "https://static-blog.treebo.com/blog/wp-content/uploads/2018/06/Tamilnadu-min.jpg",
                alt: "Coastal cliffside with crashing ocean waves and dramatic cloud formations",
                category: "travel",
                title: "Temple Moment"
            }
        ];

        let currentImageIndex = 0;
        let filteredImages = [...galleryData];
        function initializeGallery() {
            populateGallery();
            setupEventListeners();
        }
        function populateGallery() {
            const gallery = document.getElementById('gallery');
            gallery.innerHTML = '';

            filteredImages.forEach((image, index) => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.dataset.index = index;
                galleryItem.dataset.category = image.category;

                galleryItem.innerHTML = `
                    <img src="${image.src}" alt="${image.alt}" class="gallery-image">
                    <div class="image-overlay">
                        <div>
                            <div class="image-title">${image.title}</div>
                            <div class="image-category">${image.category}</div>
                        </div>
                    </div>
                `;

                gallery.appendChild(galleryItem);
            });
        }

        function setupEventListeners() {
    
            const filterButtons = document.querySelectorAll('.filter-btn');
            filterButtons.forEach(button => {
                button.addEventListener('click', handleFilterClick);
            });
            document.getElementById('gallery').addEventListener('click', handleGalleryItemClick);

            document.getElementById('close-lightbox').addEventListener('click', closeLightbox);
            document.getElementById('prev-btn').addEventListener('click', showPreviousImage);
            document.getElementById('next-btn').addEventListener('click', showNextImage);

            document.addEventListener('keydown', handleKeyboardNavigation);

            document.getElementById('lightbox').addEventListener('click', (e) => {
                if (e.target === document.getElementById('lightbox')) {
                    closeLightbox();
                }
            });
        }

        
        function handleFilterClick(e) {
            const category = e.target.dataset.category;
            
            
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');

            
            if (category === 'all') {
                filteredImages = [...galleryData];
            } else {
                filteredImages = galleryData.filter(image => image.category === category);
            }

            
            populateGallery();
        }


        function handleGalleryItemClick(e) {
            const galleryItem = e.target.closest('.gallery-item');
            if (!galleryItem) return;

            currentImageIndex = parseInt(galleryItem.dataset.index);
            showLightbox();
        }

        
        function showLightbox() {
            const lightbox = document.getElementById('lightbox');
            const lightboxImage = document.getElementById('lightbox-image');
            const lightboxCaption = document.getElementById('lightbox-caption');

            const currentImage = filteredImages[currentImageIndex];
            
            lightboxImage.src = currentImage.src;
            lightboxImage.alt = currentImage.alt;
            lightboxCaption.textContent = `${currentImage.title} - ${currentImage.category}`;

            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        
        function closeLightbox() {
            const lightbox = document.getElementById('lightbox');
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }


        function showPreviousImage() {
            currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
            showLightbox();
        }


        function showNextImage() {
            currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
            showLightbox();
        }

        function handleKeyboardNavigation(e) {
            const lightbox = document.getElementById('lightbox');
            if (!lightbox.classList.contains('active')) return;

            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    showPreviousImage();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
            }
        }


        document.addEventListener('DOMContentLoaded', initializeGallery);