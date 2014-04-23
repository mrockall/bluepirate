module BluePirate
  class App < Padrino::Application
    register SassInitializer
    use ActiveRecord::ConnectionAdapters::ConnectionManagement
    register Padrino::Rendering
    register Padrino::Mailer
    register Padrino::Helpers
    register Padrino::Admin::AccessControl

    set :admin_model, 'Player'
    set :login_page, '/login'

    enable :sessions

    set :css_asset_folder, 'css'
    set :js_asset_folder, 'js'

    set :haml, {:format => :html5}

    use OmniAuth::Builder do
      provider :identity, :fields => [:email]
    end

    error 404 do
      render 'errors/404'
    end

    error 505 do
      render 'errors/505'
    end

    get :auth, :provides => [:json, :xml], :map => '/auth/:provider/callback' do
      auth = request.env["omniauth.auth"]

      @player = Player.find_by_id auth['uid']
      set_current_account(@player)
      
      render 'login/user'
    end

    get :logged_in_user, :provides => :json do
      return {}.to_json if current_account.nil?

      @player = current_account
      render 'login/user'
    end

    get :logout do
      set_current_account(nil)
      redirect "/"
    end

    get :index, :map => '/*page', :priority => :low do
      if current_account.present?
        @current_user = Rabl.render(current_account, 'login/user', :view_path => 'app/views')
      else
        @current_user = {}.to_json
      end

      render :index
    end
  end
end
