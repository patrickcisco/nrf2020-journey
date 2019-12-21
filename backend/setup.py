
import requests
import datetime
import json
import sys

CASES = {
    "Good": "KnownGoodCase", 
    "Bad": "KnownBadCase",
}
HOST = "http://localhost"
PORT = "4001"
SERVER = "{}:{}".format(HOST, PORT)

def remove_bad_qa():
    filename = "config/bad_pick.json"
    with open(filename, 'r') as f:
        print("loading bad box {}".format(filename))
        items = json.load(f)
        for item in items:
            data = {
                "name": CASES["Bad"],
                "location": "Absent",
                "timestamp": datetime.datetime.now().timestamp()
            }
            res = requests.put(SERVER + "/qa/{}".format(item['epc']), json=data)
            print("{} removing from qa status {}".format(item["epc"], res.status_code))

def simulate_bad_qa():
    filename = "config/bad_pick.json"
    with open(filename, 'r') as f:
        print("loading bad box {}".format(filename))
        items = json.load(f)
        for item in items:
            data = {
                "name": CASES["Bad"],
                "location": "Distribution",
                "timestamp": datetime.datetime.now().timestamp()
            }
            res = requests.put(SERVER + "/qa/{}".format(item['epc']), json=data)
            print("{} adding to qa status {}".format(item["epc"], res.status_code))

def simulate_good_qa():
    filename = "config/picklist.json"
    with open(filename, 'r') as f:
        print("loading good box {}".format(filename))
        items = json.load(f)
        for item in items:
            data = {
                "name": CASES["Good"],
                "location": "Distribution",
                "timestamp": datetime.datetime.now().timestamp()
            }
            res = requests.put(SERVER + "/qa/{}".format(item['epc']), json=data)
            print("{} adding to qa status {}".format(item["epc"], res.status_code))
def remove_good_qa():
    filename = "config/picklist.json"
    with open(filename, 'r') as f:
        print("loading good box {}".format(filename))
        items = json.load(f)
        for item in items:
            data = {
                "name": CASES["Good"],
                "location": "Absent",
                "timestamp": datetime.datetime.now().timestamp()
            }
            res = requests.put(SERVER + "/qa/{}".format(item['epc']), json=data)
            print("{} removing from qa status {}".format(item["epc"], res.status_code))

def create_db():
    filename = "config/ad_tags_final.json"
    with open(filename, 'r') as f: 
        print("loading initial database {}".format(filename))
        items = json.load(f)
        res = requests.put(SERVER + "/init", json=items)
        print("initial database status {}".format(res.status_code))

def create_pick_list():
    filename = "config/picklist.json"
    with open(filename, 'r') as f:
        print("loading initial picklist {}".format(filename))
        items = json.load(f)
        for item in items:
            res = requests.put(SERVER + "/picklist", json=item)
            print("{} item added to picklist status {}".format(item["epc"], res.status_code))

def main():
    globals()[sys.argv[1]]()

if __name__ == "__main__":
    main()

