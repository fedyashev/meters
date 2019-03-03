package by.fedyashev.meters.api;

import by.fedyashev.meters.entities.User;
import retrofit2.Call;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.POST;

public interface AuthApi {
    @FormUrlEncoded
    @POST("api/v1/auth/login")
    Call<User> authLogin(@Field("login") String login, @Field("password") String password);
}
