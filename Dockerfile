FROM php:apache

RUN apt-get update && apt-get upgrade -y && apt-get install -y libpq-dev zip

RUN docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && docker-php-ext-install pgsql pdo_pgsql

# copy Apache virtual host
COPY ./conf/apache.conf /etc/apache2/sites-available/000-default.conf

# enabling Apache mod rewrite and headers
RUN a2enmod rewrite
RUN a2enmod headers

# installing Composer, the package manager of PHP
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php composer-setup.php
RUN php -r "unlink('composer-setup.php);"
RUN mv composer.phar /usr/local/bin/composer

# copy application code
COPY . /var/www/html

CMD ["sh", "-c", "sleep 5 && php ./scripts/migration.php && apache2-foreground"]