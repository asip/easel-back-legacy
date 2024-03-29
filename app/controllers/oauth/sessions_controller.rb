# frozen_string_literal: true

# oauth
module Oauth
  # Sessions Controller
  class SessionsController < ApplicationController
    protect_from_forgery except: :callback

    skip_before_action :require_login # applications_controllerでbefore_action :require_loginを設定している場合
    before_action :verify_g_csrf_token

    def callback
      provider = auth_params[:provider]

      user = login_from_oauth(provider)
      cookies.permanent[:access_token] = { value: user.token }
      redirect_to root_path
    rescue StandardError
      redirect_to login_path
    end

    private

    def login_from_oauth(provider)
      if (user = login_from(provider))
        user.assign_user_info(@user_hash[:user_info])
        user.assign_token(user_class.issue_token(id: user.id, email: user.email))
      else
        user = create_or_find_from(provider)
        user.assign_token(user_class.issue_token(id: user.id, email: user.email))
        reset_session
        auto_login(user)
      end
      user
    end

    def create_or_find_from(provider)
      if (user = user_class.find_by(email: @user_hash[:user_info]["email"]))
        user.add_provider_to_user(provider, @user_hash[:uid].to_s)
        user.assign_user_info(@user_hash[:user_info])
      else
        user = create_from(provider)
      end
      user
    end

    def verify_g_csrf_token
      if cookies["g_csrf_token"].blank? || params[:g_csrf_token].blank? ||
         cookies["g_csrf_token"] != params[:g_csrf_token]
        redirect_to login_path, notice: "不正なアクセスです"
      end
    end

    def auth_params
      params.permit(:provider, :credential)
    end
  end
end
