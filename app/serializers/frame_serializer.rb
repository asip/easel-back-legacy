# == Schema Information
#
# Table name: frames
#
#  id         :bigint           not null, primary key
#  comment    :text(65535)
#  image_data :text(65535)
#  name       :string(255)      not null
#  shooted_at :datetime
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer
#

class FrameSerializer
  include JSONAPI::Serializer
  attributes :user_id, :name, :comment
  attributes :shooted_at, :created_at, :updated_at
  has_many :comments, serializer: CommentSerializer

  attribute :tag_list do |object|
    object.tags_preview.join(",")
  end
end
