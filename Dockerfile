FROM php:apache

RUN apt-get update && apt-get upgrade -y && apt-get install -y zip

# copy Apache virtual host
COPY ./conf/apache.conf /etc/apache2/sites-available/000-default.conf

# enabling Apache mod rewrite and headers
RUN a2enmod rewrite
RUN a2enmod headers

# installing Composer, the package manager of PHP
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php -r "if (hash_file('sha384', 'composer-setup.php') === 'edb40769019ccf227279e3bdd1f5b2e9950eb000c3233ee85148944e555d97be3ea4f40c3c2fe73b22f875385f6a5155') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
RUN php composer-setup.php
RUN php -r "unlink('composer-setup.php');"
RUN mv composer.phar /usr/local/bin/composer

# copy application code
COPY . /var/www/html

CMD ["apache2-foreground"]