package by.fedyashev.meters.service;

import by.fedyashev.meters.api.AuthApi;
import by.fedyashev.meters.api.MetersApi;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class NetworkService {
    private static NetworkService instance;
    //private static final String BASE_URL = "http://192.168.100.3:5000";
    private static final String BASE_URL = "https://instaserice.by/meters/";
    private Retrofit retrofit;

    private NetworkService() {
        retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();
    }

    public static NetworkService getInstance() {
        if (instance == null) {
            instance = new NetworkService();
        }
        return instance;
    }

    public AuthApi getAuthApi() {
        return retrofit.create(AuthApi.class);
    }

    public MetersApi getMeterApi() {
        return retrofit.create(MetersApi.class);
    }
}
