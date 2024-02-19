FROM php:apache

COPY ./html /var/www/html

CMD ["apache2-foreground"]
