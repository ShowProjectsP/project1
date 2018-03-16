const state = Ember.Object.create({

	"categories": Ember.Object.create({

		"isLoading": false,

		"promise": (new jQuery.Deferred()),

		"collection": Ember.A(),

	}),

	"rateCategories": Ember.Object.create({

		"isLoading": false,

		"promise": (new jQuery.Deferred()),

		"collection": Ember.A(),

	}),

	"rateUnits": Ember.Object.create({

		"isLoading": false,

		"promise": (new jQuery.Deferred()),

		"collection": Ember.A(),
		
	})

});

const getState = (id) => {
	return state[id];
};

const self = Ember.Object.extend(Ember.ActionHandler, {

  state: state,

  getState: getState,

  actions: {

    handle: (id, payload) => {
      getState(id).setProperties(payload);
      getState(id).get('promise').resolve();
    },

    update: (id, payload) => getState(id).setProperties(payload)

  }

});


export default self.create();