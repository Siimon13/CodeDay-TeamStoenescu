from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def login():
    #here is the fake database/info that should be... gotten from js / server



    #here you should be able to receive event data from client
    #recieve event struct? yeah, and put in database

    #if database gets new event, then send to client that new event

    #!!! THIS IS REALLY HARD ^ ^ ^ RIGHT THERE ^ ^ ^ FIGURE IT OUT

    """ 
    event = {
        "type": int, # 0 is player triggered (trap)
                    # 1 is player triggered (find note)
                    # 2 is player triggered (find trinket)
                    # 3 is player movement (door)
                    # 4 is monster triggered (noise)
                    # 5 is monster triggered (encounter)
        "noise": int, #-1 if no noise
                    # 0 if room wide
                    # 1 if medium noise
                    # 2 if loud noise
                    # 3 if really really loud noise
        "damage": int, #-1 if heal 1 hp
                    # 0 if no damage
                    # 1 if 1 damage
                    # 2 if insta kill
                    # 3 if invalid
        "source_room": string name of room
        "destination_room": duh

    }

    """

    rooms = [
        {
            "name": "kitchen",
            "length": 4,
            "width": 4,
            "doors": ["hallway", "living room"]
        },
        {
            "name": "bathroom",
            "length": 2,
            "width": 2,
            "doors": ["hallway"]
        },
        {
            "name": "living Room",
            "length": 5,
            "width": 5,
            "doors": ["kitchen", "hallway", "foyer"]
        },
        {
            "name": "closet",
            "length": 1,
            "width": 1,
            "doors": ["bedroom"]
        },
        {
            "name": "hallway",
            "length": 8,
            "width": 2,
            "doors": ["kitchen", "living Room", "bedroom", "bathroom"]
        },
        {
            "name": "bedroom",
            "length": 4,
            "width": 6,
            "doors": ["closet", "hallway"]
        },
        {
            "name": "foyer",
            "length": 2,
            "width": 2,
            "doors": ["living room"]
        }
    ]

    current_room = rooms[2];

    buttons = [
        {
            "type": "Sense",
            "name": "look around"
        },
        {   # this specific button will trigger a slideout menu.
            "type": "Sense",
            "name": "inspect doors"
        }  
    ]

    for door in current_room["doors"]: # this should put the move functions at the end.
        buttons.append({
            "type": "Move",
            "name": "move to " + door
        })


    return render_template("main.html",
                            rooms = rooms, 
                            buttons = buttons)
 
if __name__=="__main__":
	app.debug=True
	app.run(host="0.0.0.0",port=5000)
