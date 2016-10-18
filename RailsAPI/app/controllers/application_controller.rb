require_relative '../assets/neighborhood_listing'

class ApplicationController < ActionController::Base
  include Listings
  protect_from_forgery with: :exception


  def index
  end


  def councilperson
    binding.pry
    neighborhood_contacts = []
    # parse listings
    doc = Nokogiri::HTML(open("http://www.nyc.gov/html/cau/html/cb/manhattan.shtml"))
    tables = doc.xpath("//tbody//tbody")

    tables.each do |table|
      if table.css('.cb_text')
        neighborhood_contacts << {
          neighborhoods: table.css('.cb_text')[0].text,
          contactInfo: table.css('.cb_text')[1].text
        }
      end
    end

    result = neighborhood_contacts.find do |hood_list|
      hood_list[:neighborhoods].downcase.include?(params[:neighborhood].downcase)
    end

    return render json: result
  end
end
