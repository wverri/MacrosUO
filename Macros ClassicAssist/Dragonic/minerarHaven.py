

import clr
import System
clr.AddReference('System.Core')
clr.ImportExtensions(System.Linq)
from Assistant import Engine

def Derreter(x,y):
    Andar(x,y)
    minerio = 0x19b9
    if FindType(minerio, 2213, "backpack"):
        MoveItemOffset("found", 0, 0, 0, -1)
    while FindType(minerio, -1, "backpack"):
        #MoveItemOffset('found', 0, 0, , 1)
        #Pause(50)
        UseObject("found")
    return

    
def Andar(x,y):
    Pathfind(x,y,0)
    tentativa = 0
    while X('self') != x or Y('self') != y:
        if not Pathfinding():
            Pathfind(x,y,0)
        Pause(100)
    return
        

def Mine(x,y):
    Andar(x,y)
    ClearJournal()
    SysMessage("Minerando")
    UseType(0xe86)
    WaitForTarget(500)
    TargetTileRelative("self", 1, False)
    while True:   
        if InJournal("There is no metal here to mine.") or InJournal("mine there."):
            return
        UseType(0xe86)
        WaitForTarget(500)
        TargetTileRelative("self", 1, False)
        Pause(100)
    return

while True:
    Mine(5915,352) 
    Mine(5916,344) 
    Mine(5909,337) 
    Mine(5909,332) 
    Mine(5909,325) 
    Mine(5909,317) 
    Mine(5909,310) 
    Mine(5909,303) 
    Mine(5914,296) 
    Mine(5918,286) 
    Mine(5927,284) 
    Mine(5933,280) 
    Mine(5935,273) 
    Mine(5950,273) 
    Mine(5960,273) 
    Mine(5969,273) 
    Mine(5972,280) 
    Mine(5977,283) 
    Mine(5985,283) 
    Mine(5989,291) 
    Mine(5985,300) 
    Mine(5992,300) 
    Mine(5993,308) 
    Mine(5993,313) 
    Mine(5992,314) 
    Mine(5992,319) 
    Mine(5993,328) 
    Mine(5993,337) 
    Mine(5987,343) 
    Mine(5986,352) 
    Mine(5981,355) 
    Mine(5975,357) 
    Mine(5968,361) 
    Mine(5959,361) 
    Mine(5951,361) 
    Mine(5944,361) 
    Mine(5934,361) 
    Mine(5929,356) 
    Mine(5919,355) 


    

