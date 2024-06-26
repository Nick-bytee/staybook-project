import { format } from "date-fns";

export class HotelDetails {
  hotelName: string = "";
  hotelEmailId: string = "";
  hotelContactNumber : string | number = '';
  hotelStarRating: string | number = '';
  hotelImageUrl: string = "";
  hotelAddress: string = "";
  hotelState: string = "";
  hotelCity: string = "";
  hotelPincode: string = "";
  hotelSlug: string = "";
  // hotelImagesList: ImagesList[] = [];

  createdAt: string = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
  updatedAt: string = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
}

export class ImagesList {
  imageId: string = "";
  imageUrl: string = "";
  imageTitle: string = "";
}
