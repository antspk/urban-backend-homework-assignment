# Urban – Backend Engineer - Technical Test

In our application, we split cities we operate in a number of different "districts" that we define. Users typically provide us with a "human-readable address" (e.g. _'EC1R5DF'_ or _'White Bear Yard'_), and we need to resolve these to a particular one of these districts (known as "service areas") e.g. LONCENTRAL.

This application is a basic implementation of this functionality as a service. There are a number of issues + improvements detailed below that we would like to see you implement. If you are tempted to update the architecture of the solution, please do so.

The success response should be a structure that contains latitude, longitude, service area and postcode at least.

    {
        "status": "OK",
        "search": "White Bear Yard",
        "location": {
            "address1": "2nd Floor, White Bear Yard", 
            "address2": "144a Clerkenwell Road", 
            "city": "London",
            "lat": 0.0000,
            "lng": 0.0000,
            "serviceArea": "LONCENTRAL"
            "postcode": "EC1R5DF"
        }
    }

If the location is not resolvable to coordinates from the geocoding APIs in use, we should return something like this (in this example _Non-existing address_ was the search term):

    {
        "status": "ADDRESS_NOT_FOUND",
        "search": "Non-existing address"
    }

If the location is resolvable to coordinates but the location isn't within any of our service areas, we should return something like this (in this example _Non-serviced address_ was the search term):

    {
        "status": "ADDRESS_NOT_SERVICED",
        "search": "Non-serviced address"
    }

## Technical requirements

* We run in Kubernetes, so we expect this service to be running inside a container (e.g.  Docker).
* Ensure a suitable level of coverage by unit + integration tests.
* Use commits in git to show how your work has evolved in this task.

## Functional requirements

* Our service area resolution from the coordinates doesn't seem to be working - can you help fix it?
* We don't seem to be getting the correct "NOT_FOUND" response when providing an address that isn't serviced - please can you help fix it?
* We also don't seem to be getting the "NOT_SERVICED" response when the address is resolvable to coordinates but falls outside our service areas - please can you implement this?
* Any errors thrown should include a suitable HTTP status code
* Google maps have recently changed their pricing to reduce the free tier usage. Please could you implement another option alongside Google maps? 
* Each geocoding source should be tried in sequence until a result is found. We should be able to easily define the order they are tried in 
* For redundancy we would like to be able to disable specific geocoding sources if that source has an outage

## What gets evaluated 

* Code cleanliness and overall quality (both production and test).
* Test coverage.
* Whether the code (and the app) is "production-ready" (i.e. tests pass, the application starts and works as expected).
* How the code is structured
* The architecture of the solution