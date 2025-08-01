document.addEventListener('DOMContentLoaded', function() {
  // Initialize lightGallery
  lightGallery(document.querySelector('.gallery-container'), {
    selector: '.gallery-item',
    download: false,
    counter: false
  });

  // Filter functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter items
      const filter = button.dataset.filter;
      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Download functionality
  document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const imageUrl = this.parentElement.parentElement.querySelector('img').src;
      const fileName = this.dataset.image || 'grace-church-image.jpg';
      
      // Create temporary link
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Feedback
      this.innerHTML = '<i class="fas fa-check"></i>';
      setTimeout(() => {
        this.innerHTML = '<i class="fas fa-download"></i>';
      }, 2000);
    });
  });

  // Load more functionality
  let currentItems = 12;
  const totalItems = 24; // Change to your actual total
  const loadMoreBtn = document.getElementById('loadMore');

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      // In a real implementation, you would fetch more items from server
      for (let i = currentItems; i < currentItems + 6; i++) {
        if (i >= totalItems) {
          loadMoreBtn.style.display = 'none';
          break;
        }
        // Here you would append new gallery items
        console.log(`Loading item ${i+1}`);
      }
      currentItems += 6;
    });
  }
});