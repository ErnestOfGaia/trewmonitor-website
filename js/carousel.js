/**
 * TrewMonitor Carousel with Touch Support and Glow Effects
 */

class Carousel {
    constructor() {
        this.track = document.getElementById('carousel-track');
        this.dots = document.querySelectorAll('.carousel-dot');
        this.prevBtn = document.getElementById('carousel-prev');
        this.nextBtn = document.getElementById('carousel-next');
        
        this.currentIndex = 0;
        this.totalSlides = 5;
        this.isAnimating = false;
        
        // Touch handling
        this.startX = 0;
        this.currentX = 0;
        this.isDragging = false;
        
        this.init();
    }
    
    init() {
        if (!this.track) return;
        
        // Button navigation
        this.prevBtn?.addEventListener('click', () => this.prev());
        this.nextBtn?.addEventListener('click', () => this.next());
        
        // Dot navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Touch events
        this.track.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
        this.track.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
        this.track.addEventListener('touchend', (e) => this.handleTouchEnd(e));
        
        // Mouse events for desktop drag
        this.track.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        document.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
        
        // Auto-play (optional - uncomment to enable)
        // this.startAutoPlay();
    }
    
    handleTouchStart(e) {
        if (this.isAnimating) return;
        this.isDragging = true;
        this.startX = e.touches[0].clientX;
        this.track.style.transition = 'none';
    }
    
    handleTouchMove(e) {
        if (!this.isDragging) return;
        
        this.currentX = e.touches[0].clientX;
        const diff = this.currentX - this.startX;
        const currentTranslate = -this.currentIndex * 100;
        const newTranslate = currentTranslate + (diff / this.track.offsetWidth) * 100;
        
        // Limit the drag at edges
        const maxTranslate = 0;
        const minTranslate = -(this.totalSlides - 1) * 100;
        const clampedTranslate = Math.max(minTranslate - 10, Math.min(maxTranslate + 10, newTranslate));
        
        this.track.style.transform = `translateX(${clampedTranslate}%)`;
        
        // Prevent vertical scrolling while swiping
        if (Math.abs(diff) > 10) {
            e.preventDefault();
        }
    }
    
    handleTouchEnd(e) {
        if (!this.isDragging) return;
        this.isDragging = false;
        
        const diff = this.currentX - this.startX;
        const threshold = this.track.offsetWidth * 0.2;
        
        this.track.style.transition = 'transform 0.5s ease-out';
        
        if (diff > threshold && this.currentIndex > 0) {
            this.prev();
        } else if (diff < -threshold && this.currentIndex < this.totalSlides - 1) {
            this.next();
        } else {
            this.goToSlide(this.currentIndex);
        }
    }
    
    handleMouseDown(e) {
        if (this.isAnimating) return;
        e.preventDefault();
        this.isDragging = true;
        this.startX = e.clientX;
        this.track.style.transition = 'none';
        this.track.style.cursor = 'grabbing';
    }
    
    handleMouseMove(e) {
        if (!this.isDragging) return;
        
        this.currentX = e.clientX;
        const diff = this.currentX - this.startX;
        const currentTranslate = -this.currentIndex * 100;
        const newTranslate = currentTranslate + (diff / this.track.offsetWidth) * 100;
        
        const maxTranslate = 0;
        const minTranslate = -(this.totalSlides - 1) * 100;
        const clampedTranslate = Math.max(minTranslate - 10, Math.min(maxTranslate + 10, newTranslate));
        
        this.track.style.transform = `translateX(${clampedTranslate}%)`;
    }
    
    handleMouseUp(e) {
        if (!this.isDragging) return;
        this.isDragging = false;
        this.track.style.cursor = 'grab';
        
        const diff = this.currentX - this.startX;
        const threshold = this.track.offsetWidth * 0.2;
        
        this.track.style.transition = 'transform 0.5s ease-out';
        
        if (diff > threshold && this.currentIndex > 0) {
            this.prev();
        } else if (diff < -threshold && this.currentIndex < this.totalSlides - 1) {
            this.next();
        } else {
            this.goToSlide(this.currentIndex);
        }
    }
    
    prev() {
        if (this.isAnimating || this.currentIndex === 0) return;
        this.goToSlide(this.currentIndex - 1);
    }
    
    next() {
        if (this.isAnimating || this.currentIndex === this.totalSlides - 1) return;
        this.goToSlide(this.currentIndex + 1);
    }
    
    goToSlide(index) {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        this.currentIndex = index;
        this.track.style.transition = 'transform 0.5s ease-out';
        this.track.style.transform = `translateX(-${index * 100}%)`;
        
        // Update dots
        this.dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        // Update arrow states
        if (this.prevBtn) {
            this.prevBtn.style.opacity = index === 0 ? '0.3' : '1';
            this.prevBtn.style.pointerEvents = index === 0 ? 'none' : 'auto';
        }
        if (this.nextBtn) {
            this.nextBtn.style.opacity = index === this.totalSlides - 1 ? '0.3' : '1';
            this.nextBtn.style.pointerEvents = index === this.totalSlides - 1 ? 'none' : 'auto';
        }
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    }
    
    startAutoPlay(interval = 5000) {
        this.autoPlayInterval = setInterval(() => {
            if (this.currentIndex < this.totalSlides - 1) {
                this.next();
            } else {
                this.goToSlide(0);
            }
        }, interval);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new Carousel();
});