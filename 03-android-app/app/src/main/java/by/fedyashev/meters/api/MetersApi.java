package by.fedyashev.meters.api;

import java.util.List;

import by.fedyashev.meters.entities.Inspector;
import by.fedyashev.meters.entities.Place;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.Path;

public interface MetersApi {

    @GET("api/v1/inspectors/user/{id}")
    Call<Inspector> getInspectorByUserId(@Header("Authorization") String token, @Path("id") int id);

    @GET("api/v1/places")
    Call<List<Place>> getPlaceList(@Header("Authorization") String token);

    @GET("api/v1/places/meter/{number}")
    Call<Place> getPlaceByMeterNumber(@Header("Authorization") String token, @Path("number") String number);
}
