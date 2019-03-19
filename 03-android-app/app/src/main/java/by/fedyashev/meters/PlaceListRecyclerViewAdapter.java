package by.fedyashev.meters;

import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.util.List;

import by.fedyashev.meters.entities.Consumer;
import by.fedyashev.meters.entities.Meter;
import by.fedyashev.meters.entities.Place;

public class PlaceListRecyclerViewAdapter extends RecyclerView.Adapter<PlaceListRecyclerViewAdapter.PlaceViewHolder> {

    public static class PlaceViewHolder extends RecyclerView.ViewHolder {

        TextView tvId;
        TextView tvName;
        TextView tvConsumer;
        TextView tvMeter;
        TextView tvIsSingNeed;

        public PlaceViewHolder(@NonNull View itemView) {
            super(itemView);

            tvId = itemView.findViewById(R.id.tvId);
            tvName = itemView.findViewById(R.id.tvName);
            tvConsumer = itemView.findViewById(R.id.tvConsumer);
            tvMeter = itemView.findViewById(R.id.tvMeter);
            tvIsSingNeed = itemView.findViewById(R.id.tvIsSignNeed);

        }
    }

    List<Place> places;

    public PlaceListRecyclerViewAdapter(List<Place> places) {
        this.places = places;
    }

    @NonNull
    @Override
    public PlaceViewHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, int i) {
        View v = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.item_place, viewGroup, false);
        PlaceViewHolder pvh = new PlaceViewHolder(v);
        return pvh;
    }

    @Override
    public void onBindViewHolder(@NonNull PlaceViewHolder placeViewHolder, int i) {
        Place place = places.get(i);
        if (place != null) {

            Consumer consumer = place.getConsumer();
            Meter meter = place.getMeter();

            placeViewHolder.tvId.setText(place.getId() + "");
            placeViewHolder.tvName.setText(place.getName());
            placeViewHolder.tvConsumer.setText(consumer != null ? consumer.getName() : "---");
            placeViewHolder.tvMeter.setText(meter != null ? meter.getNumber() : "---");
            placeViewHolder.tvIsSingNeed.setText(place.isSignNeed() ? "Подпись - ДА" : "Подпись - НЕТ");

        }
    }

    @Override
    public int getItemCount() {
        return places.size();
    }


}
