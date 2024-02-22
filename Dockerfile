FROM php:apache

# copy Apache virtual host
COPY ./conf/apache.conf /etc/apache2/sites-available/000-default.conf

# copy application code
COPY . /var/www/html

# enabling Apache mod rewrite and headers
RUN a2enmod rewrite
RUN a2enmod headers

CMD ["apache2-foreground"]