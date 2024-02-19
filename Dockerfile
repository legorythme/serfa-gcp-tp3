FROM php:apache

COPY ./html /var/www/

CMD ["apache2-foreground"]