<template>
  <div class="bg-gray-100 pt-5">

    <div class="form flex flex-col contanier bg-blue-100 py-10 mx-5 md:mx-10 lg:mx-20 xl:mx-40">

      <div class="locationForm flex flex-col lg:flex-row mx-auto bg-white shadow-md mb-5 px-10 py-5">

        <div class="locations w-1/2 lg:mr-10">
          <!-- lets user determine starting location -->
          <h2
            class="block text-lg leading-relaxed tracking-tighter text-gray-800 ml-1"
            >Starting Location:
          </h2>
          <div class="flex">
            <label>
              <GmapAutocomplete
                class="shadow-md hover:shadow-lg bg-gray-100 border-transparent focus:ring-2 ring-gray-300 rounded-lg outline-none
                text-lg pl-2"
                @place_changed="setStartPlace"
                :options="{fields: ['geometry', 'formatted_address', 'address_components']}"
                >
              </GmapAutocomplete>
            </label>

            <button
              class="bg-gray-100 uppercase rounded-full px-4 py-1 ml-5 shadow-md hover:shadow-lg hover:underline bg-gradient-to-l from-gray-300 to-gray-200
              focus:outline-none focus:ring-2 ring-gray-300"
              @click="addMarker"
              >Add
            </button>
          </div>
          <br />
        </div>

        <div class="locations w-1/2">
          <!-- lets user determine final location -->
          <h2
            class="block text-lg leading-relaxed tracking-tighter text-gray-800 ml-1"
            >Final Location:
          </h2>
          <div class="flex">
            <label>
              <GmapAutocomplete 
                class="shadow-md hover:shadow-lg bg-gray-100 border-transparent focus:ring-2 ring-gray-300 rounded-lg outline-none
                text-lg pl-2"
                @place_changed="setEndPlace"
                :options="{fields: ['geometry', 'formatted_address', 'address_components']}"
                >
              </GmapAutocomplete>
            </label>

            <button 
              class="bg-gray-100 uppercase rounded-full px-4 py-1 ml-5 shadow-md hover:shadow-lg hover:underline bg-gradient-to-l from-gray-300 to-gray-200
              focus:outline-none focus:ring-2 ring-gray-300"
              @click="addMarker"
              >Add
            </button>
          </div>
          <br />
        </div>
      </div>

      <!-- button to refresh page -->
      <button
        class="refreshBtn text-xl uppercase bg-gradient-to-l from-gray-300 to-gray-200 py-1 px-10 shadow-md hover:underline 
        hover:shadow-lg focus:outline-none focus:ring-2 ring-gray-300 mx-5 mx-auto"
        @click="reloadPage"
        >Pick New Locations Here
      </button>
    </div>


    <br />
    <gmap-map 
      class="mx-5 md:mx-10 lg:mx-20 xl:mx-40 shadow-xl"
      ref="xyz" 
      :center="center" 
      :zoom="11" 
      style="height: 700px;"
      >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
        >
      </gmap-marker>
      <!-- creates route between two markers -->
      <gmap-polyline 
        v-bind:path.sync="path" 
        v-bind:options="{ strokeColor:'#008000'}"
        >
      </gmap-polyline>
    </gmap-map>

  </div>
</template>

<script>
export default {
  name: "GoogleMap",
  data() {
    return {
      // set to Chicago as default value
      center: { lat: 41.8781, lng: -87.6298 },

      markers: [],
      places: [],
      path: [],
      currentPlace: null,
      start: '',
      end: '',
      
    };
  },

  mounted() {
    // automatically determins user's location
    // this allows to geolocate() to execute after DOM has been mounted
    this.geolocate();
  },

  methods: {

    // receives a place object via the autocomplete component
    setStartPlace(place) {
      this.currentPlace = place;
      this.start = place
    },
    setEndPlace(place) {
      this.currentPlace = place;
      this.end = place
    },

    // adds markers to the two selected locations separately
    addMarker() {
      if (this.currentPlace) {
        // function for creating the marker
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.path.push(marker);
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },

    // function that grabs location of user and sets it as the center
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        // grabs lat/lng coords from user and sets in data function
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },

    //function to refresh page
    reloadPage(){
      window.location.reload();
    }

  }
};
</script>

<style scoped>

  

</style>