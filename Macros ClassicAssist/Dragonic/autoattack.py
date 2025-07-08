SetQuietMode(True)


if not BuffExists("Healing") and Hits() < MaxHits():
	BandageSelf()
    Pause(8000)

GetEnemy(['Murderer'], 'Any', 'Closest')
if InRange('enemy', 15):
	Attack('enemy')
	if not InRange('enemy', 1):
		Pathfind('enemy')
Pause(1500)