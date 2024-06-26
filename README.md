# Easel - image viewer

![alt text](https://github.com/asip/easel-back/blob/main/public/palette.svg)

This is backend of Easel.
This includes legacy frontend implemented by Ruby on Rails.

Rails7.1 + Sorcery(authentication) + Pagy(paging) +  
Shrine(upload) + ActsAsTaggableOn(tag) +  
RailsAdmin (management console) + Discard(soft delete) +  
Hotwire (Turbo + Stimulus3) + Vue.js 3 + Bootstrap5

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version : 3.3.3
* Rails version : 7.1.3
* System dependencies : yarn (v1.22.22) & postgresql & minio & libvips & direnv
* Deployment instructions
  * Run `bundle install --path vendor/bundle` to install the required Rubygems
  * Run `yarn install` to install the required NPM packages
  * RUN `cp .env.sample .env` to edit environment variables
  * Run `EDITOR="vi" bin/rails credentials:edit` to create credentials
  * RUN `direnv allow` to set environment variables
  * Run `bundle exec rails db:create` to create a development database
  * Run `bundle exec rails db:migrate` to create database schema
  * Run `bundle exec rails db:seed` to sample records
  * Run `bin/rails assets:precompile` to bundle the included javascript modules
  * Run `bin/dev` to spin up the Rails dev server
  * Hit [localhost](http://localhost/) and you should be ready to go!

* ...

## License

The MIT License (MIT). Please see [License File](https://github.com/asip/easel/blob/main/LICENSE-MIT.txt) for more information.
