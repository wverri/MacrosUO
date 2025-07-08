

import clr
import System
clr.AddReference('System.Core')
clr.ImportExtensions(System.Linq)
from Assistant import Engine

def GetBackpackItems(filter = None):
    if Engine.Player == None:
        return []
    SysMessage("checking")

    if Engine.Player.Backpack.Container == None:
        UseObject('backpack')
        WaitForContents('backpack', 5000)

    items = Engine.Player.Backpack.Container.SelectEntities(lambda i: filter == None or i.Name.Contains(filter))

    if (items == None):
        return []

    return items.Select(lambda i: i.Serial)
    
def GetFirst(l):
    for item in l:
        return item
        

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
	miningToolList = GetBackpackItems("Picareta")	
	miningTool = GetFirst(miningToolList)	
	SysMessage("Found tool: " + hex(miningTool))
	UseObject(miningTool)
	Pause(500)
	
	while Weight() < MaxWeight():
	
		if InJournal("não tem mais minério neste local") or InJournal("Voce nao pode ver isto"):
			return
		
		if InJournal("Sua ferramenta quebrou!"):
			miningToolList = GetBackpackItems("Picareta")
			miningTool = GetFirst(miningToolList)
			SysMessage("Found tool: " + hex(miningTool))
			UseObject(miningTool)
			Pause(500)
			ClearJournal()
	        
		ClearJournal()		
		UseObject(miningTool)
		WaitForTarget(1000)
		Target('self')
		#TargetXYZ(x, y, 0)
		#TargetTileOffset(0, 0, 0)
		#TargetByResource(miningTool, 'Ore')
		Pause(1000)

	return

while True:
	Mine(2568,475) 
	Mine(2571,475) 
	Mine(2574,475) 
	Mine(2577,477) 
	Mine(2574,478) 
	Mine(2571,478) 
	Mine(2568,479) 
	Mine(2565,478) 
	Derreter(2568,482) 
	Mine(2562,482) 
	Mine(2566,482) 
	Mine(2568,482) 
	Mine(2571,482) 
	Mine(2574,482) 
	Mine(2578,482) 
	Mine(2581,482) 
	Mine(2578,485) 
	Mine(2574,486) 
	Mine(2571,486) 
	Derreter(2568,482) 
	Mine(2568,486) 
	Mine(2566,486) 
	Mine(2563,486) 
	Mine(2560,486) 
	Mine(2558,489) 
	Mine(2561,489) 
	Mine(2564,489) 
	Mine(2566,489) 
	Mine(2563,493) 
	Mine(2561,493) 
	Mine(2558,493) 
	Derreter(2568,482) 
	Mine(2555,496) 
	Mine(2558,496) 
	Mine(2561,496) 
	Mine(2560,499) 
	Mine(2557,499) 

	

