class UserSerializer
  include FastJsonapi::ObjectSerializer
  set_type :user
  set_id :id
  attributes :id, :email
end