FROM nginx:alpine

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy static files
COPY ../index.html /usr/share/nginx/html/
COPY ../css /usr/share/nginx/html/css/
COPY ../js /usr/share/nginx/html/js/
# Copy images directory
COPY ../images /usr/share/nginx/html/images/

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]