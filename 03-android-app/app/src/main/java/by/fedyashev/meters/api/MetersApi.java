package by.fedyashev.meters.api;

import java.util.List;

import by.fedyashev.meters.entities.Act01;
import by.fedyashev.meters.entities.Done;
import by.fedyashev.meters.entities.Inspector;
import by.fedyashev.meters.entities.Place;
import by.fedyashev.meters.entities.Sign;
import okhttp3.MultipartBody;
import retrofit2.Call;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.Part;
import retrofit2.http.Path;

public interface MetersApi {

    @GET("api/v1/inspectors/user/{id}")
    Call<Inspector> getInspectorByUserId(@Header("Authorization") String token, @Path("id") int id);

    @GET("api/v1/places")
    Call<List<Place>> getPlaceList(@Header("Authorization") String token);

    @GET("api/v1/places/meter/{number}")
    Call<Place> getPlaceByMeterNumber(@Header("Authorization") String token, @Path("number") String number);

    @Multipart
    @POST("api/v1/signs")
    Call<Sign> createSign(@Header("Authorization") String token, @Part MultipartBody.Part image);

    @GET("api/v1/doc/act_01")
    Call<List<Act01>> getAct01List(@Header("Authorization") String token);

    @POST("api/v1/doc/act_01")
    @FormUrlEncoded
    Call<Act01> createAct01(@Header("Authorization") String token,
                            @Field("inspector") String inspectorName,
                            @Field("consumer") String consumerName,
                            @Field("place") String placeName,
                            @Field("meter") String meterNumber,
                            @Field("sign_id") int signId,
                            @Field("date") String date,
                            @Field("value") int value);

    @GET("api/v1/doc/act_01/{id}/sendEmail")
    Call<Done> sendAct01EmailById(@Header("Authorization") String token, @Path("id") int id);
}
