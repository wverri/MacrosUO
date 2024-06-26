function sampireStarter()
{
	// Orion.CreateClientMacro('Open','World Map').Play(false, 1000);
	resetObjects();
	sampireGUI();
	targetGUI();
	// movementGUI();
}

function resetObjects()
{
	Orion.RemoveObject('sampireMountObject');
	Orion.RemoveObject('sampireEthyObject');
	Orion.RemoveObject('myWepObject01');
	Orion.RemoveObject('myWepObject02');
	Orion.RemoveObject('targetFriendObject');
}

function sampireAbilities()  // Script 01
{
	var targetGraphic = Shared.GetVar('targetGraphicGlobal');
	var targetFlags = 'mobile|ignorefriends|ignoreself' + Shared.GetVar('targetFlagsGlobal');
	var targetNotoriety = 'gray' + Shared.GetVar('targetNotorietyGlobal');
	
	while (!Player.Dead())	
	{		
		if (Orion.ObjAtLayer('LeftHand') != null && Orion.AbilityStatus('Primary') != true && Orion.AbilityStatus('Secondary') != true && Player.Mana() > 6 && !Player.Paralyzed() && !Orion.BuffExists('Webbing') && !Player.Frozen())
		{
			if (Orion.ObjAtLayer('LeftHand').Graphic() == '0x26BD')  // Bladed Staff
			{
				if (Player.Mana() > 9)
					Orion.UseAbility('primary');  // Armor ignore
			}
			else
			{
				var mob = Orion.FindType(targetGraphic, -1, 'ground', targetFlags, 1, targetNotoriety);
				if (mob.length > 1)
				{
					var myTarget = Shared.GetVar('targetGlobal');
					if (Orion.ObjectExists(myTarget))
						if (Orion.RequestName(myTarget.toString()) != 'Neira')
							Orion.UseAbility('secondary');  // Whirlwind
					else if (mob.length > 2)
						Orion.UseAbility('secondary');  // Whirlwind	
					else if (Player.Mana() > 9)
						Orion.UseAbility('primary');  // Double strike
				}
				else if (Player.Mana() > 9)
					Orion.UseAbility('primary');  // Double strike
			}
			if (Orion.InJournal('mana to perform that', 'sys|my'))
			{
				Orion.ClearJournal();
				Orion.Wait(1750);
			}	
		}
		Orion.Wait(500);
	}
}

function sampireArcherAbilities()  // Script 01
{
	while (!Player.Dead())	
	{
		if (Orion.ObjAtLayer('LeftHand') != null && Orion.AbilityStatus('Primary') != true && Orion.AbilityStatus('Secondary') != true && Player.Mana() > 12 && !Player.Paralyzed() && !Orion.BuffExists('Webbing') && !Player.Frozen())
			Orion.UseAbility('primary');
		if (Orion.InJournal('mana to perform that', 'sys|my'))
		{
			Orion.ClearJournal();
			Orion.Wait(1750);
		}
		Orion.Wait(500);
	}
}

function sampireBushido()  // Script 02
{
	var targetGraphic = Shared.GetVar('targetGraphicGlobal');
	var targetFlags = 'mobile|ignorefriends|ignoreself' + Shared.GetVar('targetFlagsGlobal');
	var targetRange = Shared.GetVar('targetRangeGlobal');
	var targetNotoriety = 'gray' + Shared.GetVar('targetNotorietyGlobal');
	var mob = Orion.FindType(targetGraphic, -1, 'ground', targetFlags, targetRange, targetNotoriety);

	if (Orion.ObjAtLayer('LeftHand') != null && !Player.Paralyzed() && !Orion.BuffExists('Webbing') && !Player.Frozen() && Player.Mana() > 2) 
	{
		if (Player.Hits('%') < 50 && Player.Mana() > 4 && Orion.Timer('evadTimez') > 26500 && !Orion.BuffExists('Evasion')) 
		{
			if (Orion.ObjAtLayer('LeftHand') != null)
			{
				Orion.Cast('403');  // Evade
				Orion.SetTimer('evadTimez', 0);
				Orion.Wait(1750);  // casting recovery time
			}
		} 
		else if (mob.length < 1 && Player.Hits('%') < 70 && Player.Mana() > 4 && Orion.Timer('confTimez') > 16500 && !Orion.BuffExists('Confidence')) 
		{
			Orion.Cast('402');  // Confide
			Orion.SetTimer('confTimez', 0);
			Orion.Wait(1750);
		} 
		else if (!Orion.BuffExists('Counter Attack') && !Orion.BuffExists('Evasion') && (!Orion.BuffExists('Confidence') || Orion.Timer('confTimez') > 8500)) 
		{
			if (Orion.ObjAtLayer('LeftHand') != null)
			{
				Orion.Cast('404');  // Counter
				Orion.Wait(1750);
			}
		}
	}
	else if (Orion.ObjAtLayer('LeftHand') == null && Player.Mana() > 4 && Orion.Timer('confTimez') > 16500 && !Player.Paralyzed() && !Orion.BuffExists('Webbing') && !Player.Frozen()) 
	{
		Orion.Cast('402');  // Confide
		Orion.SetTimer('confTimez', 0);
		Orion.Wait(1750);
	}
}

function sampireCounter()  // Script 02
{ 
	if (!Orion.BuffExists('Counter Attack')) 
		if (Orion.ObjAtLayer('LeftHand') != null)
		{
			Orion.Cast('404');  // Counter
			Orion.Wait(1750);
		}
}

function sampireConsecrate()  // Script 02
{ 
	var targetGraphic = Shared.GetVar('targetGraphicGlobal');
	var targetFlags = 'mobile|ignorefriends|ignoreself' + Shared.GetVar('targetFlagsGlobal');
	var targetRange = Shared.GetVar('targetRangeGlobal');
	var targetNotoriety = 'gray' + Shared.GetVar('targetNotorietyGlobal');
	var mob = Orion.FindType(targetGraphic, -1, 'ground', targetFlags, targetRange, targetNotoriety);

	if (mob.length > 0)
		if (Orion.ObjAtLayer('LeftHand') != null && !Orion.BuffExists('Consecrate Weapon') && Player.Mana() > 4 && Player.WarMode() && !Player.Paralyzed() && !Orion.BuffExists('Webbing') && !Player.Frozen())
		{
			Orion.Cast('203');  // Consecrate
			Orion.Wait(1750);
		}
}

function sampireRearm()  // Script 02
{ 
	while (!Player.Dead() && Orion.ObjAtLayer('LeftHand') == null)
	{
		if (!Orion.BuffExists('Disarm') && !Orion.Dragging())
			Orion.CreateClientMacro('EquipLastWeapon').Play(false, 1000);
		Orion.Wait(250);
	}
}

function sampireOnlyBushidoRepeating()  // Script 02
{ 
	Orion.SetTimer('evadTimez', 27000);  // start time 27 sec, no wait when first starting
	Orion.SetTimer('confTimez', 17000);
	while (!Player.Dead())
	{
		sampireBushido();
		Orion.Wait(250);
	}		
}

function sampireBushidoConsecrate()  // Script 02
{ 
	Orion.SetTimer('evadTimez', 27000);
	Orion.SetTimer('confTimez', 17000);
	while (!Player.Dead())
	{
		sampireBushido();
		sampireConsecrate();
		Orion.Wait(250);
	}		
}

function sampireBushidoRearm()  // Script 02
{ 
	Orion.SetTimer('evadTimez', 27000);
	Orion.SetTimer('confTimez', 17000);
	while (!Player.Dead())
	{
		sampireBushido();
		if (Orion.ObjAtLayer('LeftHand') == null && !Orion.ScriptRunning('sampireRearm'))
			Orion.Exec('sampireRearm');
		Orion.Wait(250);
	}		
}

function sampireBushidoConsecrateRearm()  // Script 02
{ 
	Orion.SetTimer('evadTimez', 27000);
	Orion.SetTimer('confTimez', 17000);
	while (!Player.Dead())
	{
		sampireBushido();
		sampireConsecrate();
		if (Orion.ObjAtLayer('LeftHand') == null && !Orion.ScriptRunning('sampireRearm'))
			Orion.Exec('sampireRearm');
		Orion.Wait(250);
	}		
}

function sampireOnlyCounterRepeating()  // Script 02
{ 
	while (!Player.Dead())
	{
		sampireCounter();
		Orion.Wait(250);
	}		
}

function sampireCounterConsecrate()  // Script 02
{ 
	while (!Player.Dead())
	{
		sampireCounter();
		sampireConsecrate();
		Orion.Wait(250);
	}		
}

function sampireCounterRearm()  // Script 02
{ 
	while (!Player.Dead())
	{
		sampireCounter();
		if (Orion.ObjAtLayer('LeftHand') == null && !Orion.ScriptRunning('sampireRearm'))
			Orion.Exec('sampireRearm');
		Orion.Wait(250);
	}		
}

function sampireCounterConsecrateRearm()  // Script 02
{ 
	while (!Player.Dead())
	{
		sampireCounter();
		sampireConsecrate();
		if (Orion.ObjAtLayer('LeftHand') == null && !Orion.ScriptRunning('sampireRearm'))
			Orion.Exec('sampireRearm');
		Orion.Wait(250);
	}		
}

function sampireOnlyConsecrateRepeating()  // Script 02
{ 
	while (!Player.Dead())
	{
		sampireConsecrate();
		Orion.Wait(250);
	}		
}

function sampireConsecrateRearm()  // Script 02
{ 
	while (!Player.Dead())
	{
		sampireConsecrate();
		if (Orion.ObjAtLayer('LeftHand') == null && !Orion.ScriptRunning('sampireRearm'))
			Orion.Exec('sampireRearm');
		Orion.Wait(250);
	}		
}

function sampireOnlyRearmRepeating()  // Script 02
{ 
	while (!Player.Dead())
	{
		if (Orion.ObjAtLayer('LeftHand') == null)
			if (!Orion.BuffExists('Disarm') && !Orion.Dragging())
				Orion.CreateClientMacro('EquipLastWeapon').Play(false, 1000);
		Orion.Wait(250);
	}
}

function sampireOnlyBandageRepeating()  // Script 03
{
	var firstAidBelt = Orion.FindType('0xA1F6');
	if (firstAidBelt.length > 0)
		Orion.UseObject(firstAidBelt[0]);
	while (!Player.Dead())
	{
		Orion.CancelTarget();
		if ((Player.Hits('%') < 90 || Player.Poisoned()) && !Orion.Dragging() && !Player.YellowHits() && !Player.Paralyzed() && !Player.Hidden() && !Orion.BuffExists('Webbing') && !Player.Frozen() && !Orion.ScriptRunning('sampireInsureItem'))
			if (!Orion.BuffExists('healing skill'))
				Orion.BandageSelf();		
		Orion.Wait(200);
	}
}

function sampireOnlyRemountRepeating()  // Script 03
{
	var mountObject = Orion.FindObject('sampireMountObject');
	if (mountObject != null)
		var mountObjectSerial = mountObject.Serial();
	var ethyObject = Orion.FindObject('sampireEthyObject');
	if (ethyObject != null)
		var ethyObjectSerial = ethyObject.Serial();
	if (ethyObject == null && mountObject != null)
	{
		while (!Player.Dead())
		{
			if (Orion.ObjAtLayer('Mount') == null && !Orion.Dragging() && !Orion.BuffExists('Dismount') && Orion.GetDistance(mountObjectSerial) < 2 && !mountObject.Dead() && !Player.Paralyzed() && !Orion.BuffExists('Webbing') && !Player.Frozen())
			{
				Orion.CancelTarget();
				Orion.Wait(1200);
				Orion.UseObject(mountObjectSerial);
				Orion.Wait(1000);
			}
			Orion.Wait(200);
		}
	}
	else if (ethyObject != null && mountObject == null)
	{
		var targetGraphic = Shared.GetVar('targetGraphicGlobal');
		var targetFlags = 'mobile|ignorefriends|ignoreself' + Shared.GetVar('targetFlagsGlobal');
		var targetRange = Shared.GetVar('targetRangeGlobal');
		var targetNotoriety = 'gray' + Shared.GetVar('targetNotorietyGlobal');
		
		while (!Player.Dead())
		{
			if (Player.Hits('%') < 99)
				var mob = Orion.FindType(targetGraphic, -1, 'ground', targetFlags, targetRange, targetNotoriety);
			else
				var mob = Orion.FindType(targetGraphic, -1, 'ground', targetFlags, 4, targetNotoriety);
			if (mob.length < 1)
			{
				if (Orion.ObjAtLayer('Mount') == null && !Orion.Dragging() && !Orion.BuffExists('Dismount') && !Player.Paralyzed() && !Orion.BuffExists('Webbing') && !Player.Frozen())
				{
					Orion.CancelTarget();
					Orion.Wait(1200);
					Orion.UseObject(ethyObjectSerial);
					Orion.Wait(1000);
				}
			}
			Orion.Wait(200);
		}
	}
	else if (ethyObject != null && mountObject != null)
	{
		var targetGraphic = Shared.GetVar('targetGraphicGlobal');
		var targetFlags = 'mobile|ignorefriends|ignoreself' + Shared.GetVar('targetFlagsGlobal');
		var targetRange = Shared.GetVar('targetRangeGlobal');
		var targetNotoriety = 'gray' + Shared.GetVar('targetNotorietyGlobal');
		
		while (!Player.Dead())
		{
			if (mountObject.Dead())
			{
				if (Player.Hits('%') < 99)
					var mob = Orion.FindType(targetGraphic, -1, 'ground', targetFlags, targetRange, targetNotoriety);
				else
					var mob = Orion.FindType(targetGraphic, -1, 'ground', targetFlags, 4, targetNotoriety);
				if (mob.length < 1)
				{
					if (Orion.ObjAtLayer('Mount') == null && !Orion.Dragging() && !Orion.BuffExists('Dismount') && !Player.Paralyzed() && !Orion.BuffExists('Webbing') && !Player.Frozen())
					{
						Orion.CancelTarget();
						Orion.Wait(1200);
						Orion.UseObject(ethyObjectSerial);
						Orion.Wait(1000);
					}
				}
			}
			else
			{
				if (Orion.ObjAtLayer('Mount') == null && !Orion.Dragging() && !Orion.BuffExists('Dismount') && Orion.GetDistance(mountObjectSerial) < 2 && !mountObject.Dead() && !Player.Paralyzed() && !Orion.BuffExists('Webbing') && !Player.Frozen())
				{
					Orion.CancelTarget();
					Orion.Wait(1200);
					Orion.UseObject(mountObjectSerial);
					Orion.Wait(1000);
				}	
			}
			Orion.Wait(200);
		}
	}
	else
		Orion.Print('Select a mount and/or ethy.');
}

function sampireBandageRemount()  // Script 03
{
	var mountObject = Orion.FindObject('sampireMountObject');
	if (mountObject != null)
		var mountObjectSerial = mountObject.Serial();
	var ethyObject = Orion.FindObject('sampireEthyObject');
	if (ethyObject != null)
		var ethyObjectSerial = ethyObject.Serial();
	if (ethyObject == null && mountObject == null)
	{
		Orion.Print('Select a mount and/or ethy.');
		return;
	}
	var firstAidBelt = Orion.FindType('0xA1F6');
	if (firstAidBelt.length > 0)
		Orion.UseObject(firstAidBelt[0]);
	while (!Player.Dead())
	{
		Orion.CancelTarget();
		if ((Player.Hits('%') < 90 || Player.Poisoned()) && !Orion.Dragging() && !Player.YellowHits() && !Player.Paralyzed() && !Player.Hidden() && !Orion.BuffExists('Webbing') && !Player.Frozen() && !Orion.ScriptRunning('sampireInsureItem'))
			if (!Orion.BuffExists('healing skill'))
				Orion.BandageSelf();
		if (Orion.ObjAtLayer('Mount') == null && !Orion.Dragging() && !Orion.BuffExists('Dismount') && Orion.GetDistance(mountObjectSerial) < 2 && !mountObject.Dead() && !Player.Paralyzed() && !Orion.BuffExists('Webbing') && !Player.Frozen())
		{
			Orion.CancelTarget();
			Orion.Wait(1200);
			Orion.UseObject(mountObjectSerial);
			Orion.Wait(1000);
		}
		Orion.Wait(200);
	}
}

function sampirePaperdoll()  // Script 04
{
	while (!Player.Dead())
	{
		if (Player.Hits('%') > 50)
		{
			Orion.ClosePaperdoll('Self');
			Orion.Wait(1000);
			Orion.OpenPaperdoll('Self');
		}
		Orion.Wait(1000);
	}
}

function sampireGUIexecutor()
{
	var sampireAbilitiesValue = Shared.GetVar('sampireAbilitiesGlobal');
	var sampireConsecrateValue = Shared.GetVar('sampireConsecrateGlobal');
	var sampireBushidoValue = Shared.GetVar('sampireBushidoGlobal');
	var sampireCounterValue = Shared.GetVar('sampireCounterGlobal');
	var sampireRemountValue = Shared.GetVar('sampireRemountGlobal');
	var sampireRearmValue = Shared.GetVar('sampireRearmGlobal');
	var sampireBandiesValue = Shared.GetVar('sampireBandiesGlobal');
	var sampirePaperdollValue = Shared.GetVar('sampirePaperdollGlobal');
	// Orion.Print('Sampire Abilities: ' + sampireAbilitiesValue);
	// Orion.Print('Sampire Consecrate: ' + sampireConsecrateValue);
	// Orion.Print('Sampire Bushido: ' + sampireBushidoValue);
	// Orion.Print('Sampire Counter: ' + sampireCounterValue);
	// Orion.Print('Sampire Remount: ' + sampireRemountValue);
	// Orion.Print('Sampire Rearm: ' + sampireRearmValue);
	// Orion.Print('Sampire Bandies: ' + sampireBandiesValue);
	// Orion.Print('Sampire Paperdoll: ' + sampirePaperdollValue);
	if (Orion.ScriptRunning('sampireAbilities'))
		Orion.Terminate('sampireAbilities');
	if (Orion.ScriptRunning('sampireArcherAbilities'))
		Orion.Terminate('sampireArcherAbilities');
	if (Orion.ScriptRunning('sampireOnlyBushidoRepeating'))
		Orion.Terminate('sampireOnlyBushidoRepeating');
	if (Orion.ScriptRunning('sampireBushidoConsecrate'))
		Orion.Terminate('sampireBushidoConsecrate');
	if (Orion.ScriptRunning('sampireBushidoRearm'))
		Orion.Terminate('sampireBushidoRearm');
	if (Orion.ScriptRunning('sampireBushidoConsecrateRearm'))
		Orion.Terminate('sampireBushidoConsecrateRearm');
	if (Orion.ScriptRunning('sampireOnlyCounterRepeating'))
		Orion.Terminate('sampireOnlyCounterRepeating');
	if (Orion.ScriptRunning('sampireCounterConsecrate'))
		Orion.Terminate('sampireCounterConsecrate');
	if (Orion.ScriptRunning('sampireCounterRearm'))
		Orion.Terminate('sampireCounterRearm');
	if (Orion.ScriptRunning('sampireCounterConsecrateRearm'))
		Orion.Terminate('sampireCounterConsecrateRearm');
	if (Orion.ScriptRunning('sampireOnlyConsecrateRepeating'))
		Orion.Terminate('sampireOnlyConsecrateRepeating');
	if (Orion.ScriptRunning('sampireConsecrateRearm'))
		Orion.Terminate('sampireConsecrateRearm');
	if (Orion.ScriptRunning('sampireOnlyRearmRepeating'))
		Orion.Terminate('sampireOnlyRearmRepeating');
	if (Orion.ScriptRunning('sampireOnlyBandageRepeating'))
		Orion.Terminate('sampireOnlyBandageRepeating');
	if (Orion.ScriptRunning('sampireOnlyRemountRepeating'))
		Orion.Terminate('sampireOnlyRemountRepeating');
	if (Orion.ScriptRunning('sampireBandageRemount'))
		Orion.Terminate('sampireBandageRemount');
	if (Orion.ScriptRunning('sampirePaperdoll'))
		Orion.Terminate('sampirePaperdoll');
	if (sampireAbilitiesValue)  // Script 01
	{
		if (Orion.SkillValue('Archery') > 90)
		{
			Orion.Print('Archer Abilities');
			if (Orion.ScriptRunning('sampireArcherAbilities'))
				Orion.Terminate('sampireArcherAbilities');
			Orion.Exec('sampireArcherAbilities');
		}
		else
		{
			Orion.Print('Abilities');
			if (Orion.ScriptRunning('sampireAbilities'))
				Orion.Terminate('sampireAbilities');
			Orion.Exec('sampireAbilities');
		}
	}
	if (sampireConsecrateValue && !sampireBushidoValue && !sampireRearmValue && !sampireCounterValue)  // Script 02
	{
		Orion.Print('Consecrate');
		if (Orion.ScriptRunning('sampireOnlyConsecrateRepeating'))
			Orion.Terminate('sampireOnlyConsecrateRepeating');
		Orion.Exec('sampireOnlyConsecrateRepeating');
	}
	else if (sampireConsecrateValue && !sampireBushidoValue && sampireRearmValue && !sampireCounterValue)  // Script 02
	{
		Orion.Print('Consecrate and Rearm');
		if (Orion.ScriptRunning('sampireConsecrateRearm'))
			Orion.Terminate('sampireConsecrateRearm');
		Orion.Exec('sampireConsecrateRearm');
	}
	if (sampireConsecrateValue && sampireBushidoValue && sampireRearmValue && !sampireCounterValue)  // Script 02
	{
		Orion.Print('Bushido and Consecrate and Rearm');
		if (Orion.ScriptRunning('sampireBushidoConsecrateRearm'))
			Orion.Terminate('sampireBushidoConsecrateRearm');
		Orion.Exec('sampireBushidoConsecrateRearm');
	}
	else if (!sampireConsecrateValue && sampireBushidoValue && !sampireRearmValue && !sampireCounterValue)  // Script 02
	{
		Orion.Print('Bushido');
		if (Orion.ScriptRunning('sampireOnlyBushidoRepeating'))
			Orion.Terminate('sampireOnlyBushidoRepeating');
		Orion.Exec('sampireOnlyBushidoRepeating');
	}
	else if (sampireConsecrateValue && sampireBushidoValue && !sampireRearmValue && !sampireCounterValue)  // Script 02
	{
		Orion.Print('Bushido and Consecrate');
		if (Orion.ScriptRunning('sampireBushidoConsecrate'))
			Orion.Terminate('sampireBushidoConsecrate');
		Orion.Exec('sampireBushidoConsecrate');
	}
	else if (!sampireConsecrateValue && sampireBushidoValue && sampireRearmValue && !sampireCounterValue)  // Script 02
	{
		Orion.Print('Bushido and Rearm');
		if (Orion.ScriptRunning('sampireBushidoRearm'))
			Orion.Terminate('sampireBushidoRearm');
		Orion.Exec('sampireBushidoRearm');
	}
	if (sampireConsecrateValue && sampireCounterValue && sampireRearmValue && !sampireBushidoValue)  // Script 02
	{
		Orion.Print('Counter and Consecrate and Rearm');
		if (Orion.ScriptRunning('sampireCounterConsecrateRearm'))
			Orion.Terminate('sampireCounterConsecrateRearm');
		Orion.Exec('sampireCounterConsecrateRearm');
	}
	else if (!sampireConsecrateValue && sampireCounterValue && !sampireRearmValue && !sampireBushidoValue)  // Script 02
	{
		Orion.Print('Counter');
		if (Orion.ScriptRunning('sampireOnlyCounterRepeating'))
			Orion.Terminate('sampireOnlyCounterRepeating');
		Orion.Exec('sampireOnlyCounterRepeating');
	}
	else if (sampireConsecrateValue && sampireCounterValue && !sampireRearmValue && !sampireBushidoValue)  // Script 02
	{
		Orion.Print('Counter and Consecrate');
		if (Orion.ScriptRunning('sampireCounterConsecrate'))
			Orion.Terminate('sampireCounterConsecrate');
		Orion.Exec('sampireCounterConsecrate');
	}
	else if (!sampireConsecrateValue && sampireCounterValue && sampireRearmValue && !sampireBushidoValue)  // Script 02
	{
		Orion.Print('Counter and Rearm');
		if (Orion.ScriptRunning('sampireCounterRearm'))
			Orion.Terminate('sampireCounterRearm');
		Orion.Exec('sampireCounterRearm');
	}
	if (!sampireConsecrateValue && !sampireBushidoValue && sampireRearmValue && !sampireCounterValue)  // Script 02
	{
		Orion.Print('Rearm');
		if (Orion.ScriptRunning('sampireOnlyRearmRepeating'))
			Orion.Terminate('sampireOnlyRearmRepeating');
		Orion.Exec('sampireOnlyRearmRepeating');
	}
	if (sampireRemountValue && sampireBandiesValue)  // Script 03
	{
		Orion.Print('Bandage and Remount');
		if (Orion.ScriptRunning('sampireBandageRemount'))
			Orion.Terminate('sampireBandageRemount');
		Orion.Exec('sampireBandageRemount');
	}
	else if (sampireRemountValue && !sampireBandiesValue)  // Script 03
	{
		Orion.Print('Remount');
		if (Orion.ScriptRunning('sampireOnlyRemountRepeating'))
			Orion.Terminate('sampireOnlyRemountRepeating');
		Orion.Exec('sampireOnlyRemountRepeating');
	}
	else if (!sampireRemountValue && sampireBandiesValue)  // Script 03
	{
		Orion.Print('Bandage');
		if (Orion.ScriptRunning('sampireOnlyBandageRepeating'))
			Orion.Terminate('sampireOnlyBandageRepeating');
		Orion.Exec('sampireOnlyBandageRepeating');
	}
	if (sampirePaperdollValue)  // Script 04
	{
		Orion.Print('Paperdoll');
		if (Orion.ScriptRunning('sampirePaperdoll'))
			Orion.Terminate('sampirePaperdoll');
		Orion.Exec('sampirePaperdoll');
	}
}

function sampireGUIinputCheck()
{
	if (CustomGumpResponse.Checks() != null)
	{
		if (CustomGumpResponse.Checks().indexOf(14) !== -1)  // Abilities
		{
			// Orion.Print('Abilities');
			Shared.AddVar('sampireAbilitiesGlobal', true);
		}
		else
			Shared.AddVar('sampireAbilitiesGlobal', false);
		if (CustomGumpResponse.Checks().indexOf(15) !== -1)  // Consecrate
		{
			// Orion.Print('Consecrate');
			Shared.AddVar('sampireConsecrateGlobal', true);
		}
		else
			Shared.AddVar('sampireConsecrateGlobal', false);
		if (CustomGumpResponse.Checks().indexOf(16) !== -1 && CustomGumpResponse.Checks().indexOf(16) == -1)  // Bushido
		{  
			// Orion.Print('Bushido');
			Shared.AddVar('sampireBushidoGlobal', true);
		} 
		else
			Shared.AddVar('sampireBushidoGlobal', false);
		if (CustomGumpResponse.Checks().indexOf(17) !== -1)  // Counter Attack
		{  
			// Orion.Print('Counter Attack');
			Shared.AddVar('sampireCounterGlobal', true);
		} 
		else
			Shared.AddVar('sampireCounterGlobal', false);
		if (CustomGumpResponse.Checks().indexOf(18) !== -1)  // Remount
		{  
			// Orion.Print('Remount');
			Shared.AddVar('sampireRemountGlobal', true);
		} 
		else
			Shared.AddVar('sampireRemountGlobal', false);
		if (CustomGumpResponse.Checks().indexOf(19) !== -1)  // Rearm
		{  
			// Orion.Print('Rearm');
			Shared.AddVar('sampireRearmGlobal', true);
		} 
		else
			Shared.AddVar('sampireRearmGlobal', false);
		if (CustomGumpResponse.Checks().indexOf(20) !== -1)  // Bandies
		{  
			// Orion.Print('Bandies');
			Shared.AddVar('sampireBandiesGlobal', true);
		} 
		else
			Shared.AddVar('sampireBandiesGlobal', false);
		if (CustomGumpResponse.Checks().indexOf(21) !== -1)  // Paperdoll
		{  
			// Orion.Print('Paperdoll');
			Shared.AddVar('sampirePaperdollGlobal', true);
		} 
		else
			Shared.AddVar('sampirePaperdollGlobal', false);
	}
}

function sampireInsureItem()
{
	var backpackItems = Orion.FindType('any', 'any', 'backpack');
	Orion.CancelTarget();
	backpackItems.forEach(sampireItemsPassed);
	Orion.Wait(200);
	Orion.CancelTarget();
}

function sampireItemsPassed(backpackItems)
{
	var sampireGUIinputText = Shared.GetVar('sampireGUIinputTextGlobal');
	var itemSelected = Orion.FindObject(backpackItems);
	var itemProperties = itemSelected.Properties();
	// Orion.Print(Shared.GetVar('sampireGUIinputTextGlobal'));
	if(!Orion.HaveTarget())
	{
		Orion.RequestContextMenu('self');
		Orion.WaitContextMenuID('self', 418);
		Orion.WaitForTarget();
	}
	if (Orion.Contains(itemProperties, sampireGUIinputText) && !Orion.Contains(itemProperties, 'Insured')) 
		Orion.WaitTargetObject(itemSelected.Serial()); 
	Orion.Wait(250);
}

function sampireGUIcontrols(unused)
{
	var gumpResponseCode = CustomGumpResponse.ReturnCode();
	// Orion.Print('Custom gump01 response gumpResponseCode = ' + gumpResponseCode);
	if (gumpResponseCode == 1)  // Start
	{ 
		Orion.Print('Sampire GUI - Start');
		sampireGUIinputCheck();
		if (Orion.ScriptRunning('sampireGUIexecutor'))
			Orion.Terminate('sampireGUIexecutor');
		Orion.Exec('sampireGUIexecutor');
	}
	else if (gumpResponseCode == 2)  // Pause
	{ 
		Orion.Print('Sampire GUI - Pause');
		if (Orion.ScriptRunning('sampireAbilities'))
			Orion.PauseScript('sampireAbilities');
		if (Orion.ScriptRunning('sampireArcherAbilities'))
			Orion.PauseScript('sampireArcherAbilities');
		if (Orion.ScriptRunning('sampireOnlyBushidoRepeating'))
			Orion.PauseScript('sampireOnlyBushidoRepeating');
		if (Orion.ScriptRunning('sampireBushidoConsecrate'))
			Orion.PauseScript('sampireBushidoConsecrate');
		if (Orion.ScriptRunning('sampireBushidoRearm'))
			Orion.PauseScript('sampireBushidoRearm');
		if (Orion.ScriptRunning('sampireBushidoConsecrateRearm'))
			Orion.PauseScript('sampireBushidoConsecrateRearm');
		if (Orion.ScriptRunning('sampireOnlyCounterRepeating'))
			Orion.PauseScript('sampireOnlyCounterRepeating');
		if (Orion.ScriptRunning('sampireCounterConsecrate'))
			Orion.PauseScript('sampireCounterConsecrate');
		if (Orion.ScriptRunning('sampireCounterRearm'))
			Orion.PauseScript('sampireCounterRearm');
		if (Orion.ScriptRunning('sampireCounterConsecrateRearm'))
			Orion.PauseScript('sampireCounterConsecrateRearm');
		if (Orion.ScriptRunning('sampireOnlyConsecrateRepeating'))
			Orion.PauseScript('sampireOnlyConsecrateRepeating');
		if (Orion.ScriptRunning('sampireConsecrateRearm'))
			Orion.PauseScript('sampireConsecrateRearm');
		if (Orion.ScriptRunning('sampireOnlyRearmRepeating'))
			Orion.PauseScript('sampireOnlyRearmRepeating');
		if (Orion.ScriptRunning('sampireOnlyBandageRepeating'))
			Orion.PauseScript('sampireOnlyBandageRepeating');
		if (Orion.ScriptRunning('sampireOnlyRemountRepeating'))
			Orion.PauseScript('sampireOnlyRemountRepeating');
		if (Orion.ScriptRunning('sampireBandageRemount'))
			Orion.PauseScript('sampireBandageRemount');
		if (Orion.ScriptRunning('sampirePaperdoll'))
			Orion.PauseScript('sampirePaperdoll');
	} 	
	else if (gumpResponseCode == 3)  // Exit
	{
		Orion.Print('Sampire GUI - Exit');
		var sampireGUIgump = Orion.CreateCustomGump(1422);
		sampireGUIgump.Close();
		var targetGUIgump = Orion.CreateCustomGump(1423);
		targetGUIgump.Close();
		var movementGUIgump = Orion.CreateCustomGump(1424);
		movementGUIgump.Close();
		Orion.Terminate('all');
	} 
	else if (gumpResponseCode == 4)  // Wep One
	{  
		Orion.Print('Wep One - Select a weapon or press escape.');
		Orion.AddObject('myWepObject01');
		Orion.WaitForAddObject('myWepObject01');
		var sampireWepOneValue = Orion.FindObject('myWepObject01');
		Shared.AddVar('sampireWepOneGlobal',sampireWepOneValue.Serial());
	}
	else if (gumpResponseCode == 5)  // Wep Two 
	{  
		Orion.Print('Wep Two - Select a weapon or press escape.');
		Orion.AddObject('myWepObject02');
		Orion.WaitForAddObject('myWepObject02');
		var sampireWepTwoValue = Orion.FindObject('myWepObject02');
		Shared.AddVar('sampireWepTwoGlobal',sampireWepTwoValue.Serial());
	}
	else if (gumpResponseCode == 6)  // Mount
	{  
		Orion.Print('Mount - Select a mount or press escape.');
		Orion.AddObject('sampireMountObject');
		Orion.WaitForAddObject('sampireMountObject');
	} 
	else if (gumpResponseCode == 7)  // Ethy
	{  
		Orion.Print('Ethy - Select a ethy or press escape.');
		Orion.AddObject('sampireEthyObject');
		Orion.WaitForAddObject('sampireEthyObject');
	}
	else if (gumpResponseCode == 8)  // Swap Wep
	{  
		Orion.Print('Swap Wep');
		if (Orion.ObjAtLayer('LeftHand') == null)
		{
			Orion.Print('Please equip your weapon.');
			Orion.CreateClientMacro('EquipLastWeapon').Play(false, 1000);
		}
		else if (Orion.ObjAtLayer('LeftHand').Serial() == Shared.GetVar('sampireWepOneGlobal'))
		{
			Orion.Unequip('LeftHand');
			Orion.Wait(1000);
			while (Orion.ObjAtLayer('LeftHand') == null)
			{
				if (!Orion.BuffExists('Disarm'))
					Orion.Equip(Shared.GetVar('sampireWepTwoGlobal'));  // Wep Two
				Orion.Wait(250);
			}
			Orion.Cast('404');  // Counter Attack
		}
		else
		{
			Orion.Unequip('LeftHand');
			Orion.Wait(1000);
			while (Orion.ObjAtLayer('LeftHand') == null)
			{
				if (!Orion.BuffExists('Disarm'))
					Orion.Equip(Shared.GetVar('sampireWepOneGlobal'));  // Wep One
				Orion.Wait(250);
			}
			Orion.Cast('404');  // Counter Attack
		}
	} 
	else if (gumpResponseCode == 9)  // Heal
	{  
		if (!Player.Dead() && !Player.Paralyzed() && !Orion.BuffExists('Webbing') && !Player.Frozen())
		{
			if (Player.YellowHits())
				Orion.CastTarget('209', 'self');  // Remove Curse
			else if (Player.Poisoned())
				Orion.CastTarget('201', 'self');  // Cleanse by Fire
			else if (Player.Hits('%') < 99)
				Orion.CastTarget('202', 'self');  // Close Wounds
		}
	}
	else if (gumpResponseCode == 10) // Onslaught
	{  
		Orion.Print('Onslaught');
		Orion.ClearJournal();
		Orion.PauseScript('sampireGUIexecutor');
		Orion.Cast('729');
		Orion.WaitJournal('You deliver an onslaught of sword strikes!', Orion.Now(), Orion.Now()+4000, 'sys|my');
		Orion.ResumeScript('sampireGUIexecutor');
		Orion.ClearJournal();
	}  
	else if (gumpResponseCode == 11)  // Enemy of One
	{  
		Orion.Print('Enemy of One');
		Orion.Cast('206');
	} 
	else if (gumpResponseCode == 12)  // Durability
	{ 
		var equipmentArray = [2,3,4,6,7,8,9,10,12,13,14,17,18,19,20,22];
		for (var x = 0; x < equipmentArray.length; x++)
		{
			if (Orion.ObjAtLayer(equipmentArray[x]) != null)
			{
				var equipmentDurabilityProperty = Orion.ObjAtLayer(equipmentArray[x]).Properties().match(/Durability (\d+)/);
				// Orion.Print(equipmentDurabilityProperty[1]);
				if (equipmentDurabilityProperty != null)
					if (parseInt(equipmentDurabilityProperty[1]) < 50) 
						Orion.Print(Orion.ObjAtLayer(equipmentArray[x]).Properties().split('\n')[0] + ', ' + equipmentDurabilityProperty[1]);
			}
		}
	}
	else if (gumpResponseCode == 13)  // Insure
	{  
		var sampireGUIinputText = CustomGumpResponse.Texts();
		if (sampireGUIinputText[0].Text().length > 0)
		{
			Orion.Print('Insure');
			Shared.AddVar('sampireGUIinputTextGlobal',sampireGUIinputText[0].Text());
			if(Orion.ScriptRunning('sampireInsureItem'))
				Orion.Terminate('sampireInsureItem');
			Orion.Exec('sampireInsureItem');
		}
	} 
	else { Orion.Print('FML... Custom sampireGUIgump serial ' + CustomGumpResponse.Serial()); }  // Nothing
}

function sampireGUI()
{
	var sampireGUIgump = Orion.CreateCustomGump(1422);
	sampireGUIgump.SetNoClose(true);
	sampireGUIgump.Clear();
	sampireGUIgump.SetCallback('sampireGUIcontrols');
	//sampireGUIgump.AddResizepic(0, 0, '13BE', 310, 288);
	sampireGUIgump.AddGumpPic(0, 0, '0x4CC');
	var itemSerial = 1;	
	sampireGUIgump.AddText(153, 5, '0x0037', 'Sampire GUI');
	// Buttons
	sampireGUIgump.AddResizepic(45, 34, '0x24EA', 80, 32, itemSerial++, 1);
	sampireGUIgump.AddText(66, 40, '0x0045', "<big>Start</big>");
	sampireGUIgump.AddResizepic(157, 34, '0x24EA', 80, 32, itemSerial++, 1);
	sampireGUIgump.AddText(181, 40, '0x0056', "Pause");
	sampireGUIgump.AddResizepic(270, 34, '0x24EA', 80, 32, itemSerial++, 1);
	sampireGUIgump.AddText(298, 40, '0x0024', "Exit");
	sampireGUIgump.AddResizepic(26, 71, '0x24EA', 80, 32, itemSerial++, 1);
	sampireGUIgump.AddText(38, 77, '0', "Wep One");
	sampireGUIgump.AddResizepic(114, 71, '0x24EA', 80, 32, itemSerial++, 1);
	sampireGUIgump.AddText(126, 77, '0', "Wep Two");
	sampireGUIgump.AddResizepic(202, 71, '0x24EA', 80, 32, itemSerial++, 1);
	sampireGUIgump.AddText(224, 77, '0', "Mount");
	sampireGUIgump.AddResizepic(290, 71, '0x24EA', 80, 32, itemSerial++, 1);
	sampireGUIgump.AddText(316, 77, '0', "Ethy");
	sampireGUIgump.AddResizepic(20, 255, '0x24EA', 90, 32, itemSerial++, 1);
	sampireGUIgump.AddText(26, 261, '0', "Swap Weapon");
	sampireGUIgump.AddResizepic(123, 255, '0x24EA', 60, 32, itemSerial++, 1);
	sampireGUIgump.AddText(140, 261, '0', "Heal");
	sampireGUIgump.AddResizepic(196, 255, '0x24EA', 70, 32, itemSerial++, 1);
	sampireGUIgump.AddText(204, 261, '0', "Onslaught");
	sampireGUIgump.AddResizepic(278, 255, '0x24EA', 95, 32, itemSerial++, 1);
	sampireGUIgump.AddText(285, 261, '0', "Enemy of One");
	sampireGUIgump.AddButtonTileArt(itemSerial++, 51, 211, '0x16CD', '0x16CE', '0x16CD', '0', -1, -1, 25, 25);
	sampireGUIgump.AddText(85, 208, '0', "Check Equipment Durability Under 50");
	sampireGUIgump.AddButtonTileArt(itemSerial++, 51, 232, '0x16CD', '0x16CE', '0x16CD', '0', -1, -1, 25, 25);
	// Checkboxes
	sampireGUIgump.AddCheckbox(itemSerial++, 50, 109, '0x00D2', '0x00D2', '0x00D3', 0, '0', 'Combat Abilities');
	sampireGUIgump.AddCheckbox(itemSerial++, 50, 135, '0x00D2', '0x00D2', '0x00D3', 0, '0', 'Consecrate Weapon');
	sampireGUIgump.AddCheckbox(itemSerial++, 50, 161, '0x00D2', '0x00D2', '0x00D3', 0, '0', 'Bushido Spells');
	sampireGUIgump.AddCheckbox(itemSerial++, 50, 187, '0x00D2', '0x00D2', '0x00D3', 0, '0', 'Counter Attack Only');
	sampireGUIgump.AddCheckbox(itemSerial++, 230, 109, '0x00D2', '0x00D2', '0x00D3', 0, '0', 'Remount');
	sampireGUIgump.AddCheckbox(itemSerial++, 230, 135, '0x00D2', '0x00D2', '0x00D3', 0, '0', 'Rearm Weapon');
	sampireGUIgump.AddCheckbox(itemSerial++, 230, 161, '0x00D2', '0x00D2', '0x00D3', 0, '0', 'Auto Bandages');
	sampireGUIgump.AddCheckbox(itemSerial++, 230, 187, '0x00D2', '0x00D2', '0x00D3', 0, '0', 'Toggle Paperdoll');
	// Text entry
	sampireGUIgump.AddResizepic(85, 230, '0x0BB8', 260, 21);
	sampireGUIgump.AddTextEntry(itemSerial++, 90, 231, '0x0BB8', '', 260, 20);
	sampireGUIgump.SetTextEntryPlaceholderText(' Item name to insure...');
	
	sampireGUIgump.Select('sampireGUIgump');
	sampireGUIgump.Update();
}

function targetGUIexecutor()
{
	var targetGraphic = Shared.GetVar('targetGraphicGlobal');
	var targetFlags = 'mobile|ignorefriends|ignoreself' + Shared.GetVar('targetFlagsGlobal');
	var targetRange = Shared.GetVar('targetRangeGlobal'); 
	var targetNotoriety = 'gray' + Shared.GetVar('targetNotorietyGlobal');
	var targetHpStop = Shared.GetVar('targetHpStopGlobal');
	var targetHonor = Shared.GetVar('targetHonorGlobal');
	var targetRotation = Shared.GetVar('targetRotationGlobal');
	var actualRotation = (targetRotation * 1000)-200;
	Orion.Print('Target Graphic: ' + targetGraphic);
	Orion.Print('Target Flags: ' + targetFlags);
	Orion.Print('Target Range: ' + targetRange);
	Orion.Print('Target Notoriety: ' + targetNotoriety);
	Orion.Print('Target Hp Stop: ' + targetHpStop);
	Orion.Print('Target Honor: ' + targetHonor);
	Orion.Print('Target Rotation: ' + targetRotation);
	
	while (!Player.Dead())
	{
		var targets = Orion.FindType(targetGraphic, -1, 'ground', targetFlags, targetRange, targetNotoriety);
		if (targets.length > 0 && Player.Hits('%') > targetHpStop)
		{
			if(targetHonor && !Orion.Contains(Orion.BuffDescription('perfection'), 'Neira|Piper|Rikktor|Semidar|Mephitis|Oaks|Silvani|Ilhenir|Meraktus|Serado|Primeval|Abyssal|Turtle'))
			{
				Orion.InvokeVirtue('Honor');
				Orion.WaitTargetObject(targets[0]); 
			}
			Orion.Attack(targets[0]);
			Shared.AddVar('targetNameGlobal', targets[0]);
			Orion.Wait(actualRotation);
		}
		Orion.Wait(200);
	}
}	

function targetGUIinputCheck()
{
	var targetNotorietyValue = '';
	var targetGraphicValue = '';
	var targetFlagsValue = '';
	var targetHpStopValue = 0;
	var targetRangeValue = 9;
	var targetRotationValue = 2;
	if (CustomGumpResponse.Checks() != null)
	{
		if (CustomGumpResponse.Checks().indexOf(7) !== -1)  // Blue
		{
			// Orion.Print('Blue');
			targetNotorietyValue += '|blue';
		}
		if (CustomGumpResponse.Checks().indexOf(8) !== -1)  // Orange
		{  
			// Orion.Print('Orange');
			targetNotorietyValue += '|orange';
		} 
		if (CustomGumpResponse.Checks().indexOf(9) !== -1)  // Red
		{  	
			// Orion.Print('Red');
			targetNotorietyValue += '|red';
		} 
		if (CustomGumpResponse.Checks().indexOf(10) !== -1)  // Criminal
		{  
			// Orion.Print('Criminal');
			targetNotorietyValue += '|criminal';
		} 
		Shared.AddVar('targetNotorietyGlobal',targetNotorietyValue);  // Notoriety
		if (CustomGumpResponse.Checks().indexOf(11) !== -1)  // No Summonable -  EV / Collosus / Reaper / Skel Mage / Mummy / Skel Knight / Lich / Flesh Golem / Lich Lord / Nature's Fury
		{  
			// Orion.Print('No Summonable');
			targetGraphicValue = '!0x033D|!0x00A4|!0x20FA|!0x25BE|!0x25A7|!0x25BD|!0x20F8|!0x2624|!0x25A5|!0x0033';  // add Animated Wep / Skel Dragon
			Shared.AddVar('targetGraphicGlobal',targetGraphicValue);
		} 
		else if (CustomGumpResponse.Checks().indexOf(12) !== -1)  // No EV / Collosus
		{  
			// Orion.Print('No EV / Collosus');
			targetGraphicValue = '!0x033D|!0x00A4';
			Shared.AddVar('targetGraphicGlobal',targetGraphicValue);
		} 
		else 
		{ 
			// Orion.Print('Default Graphic');
			Shared.AddVar('targetGraphicGlobal',-1);
		}
		if (CustomGumpResponse.Checks().indexOf(13) !== -1)  // Near
		{  
			// Orion.Print('Human');
			targetFlagsValue += '|near';
		}
		if (CustomGumpResponse.Checks().indexOf(14) !== -1)  // Human
		{  
			// Orion.Print('Human');
			targetFlagsValue += '|human';
		} 
		if (CustomGumpResponse.Checks().indexOf(15) !== -1)  // Los
		{  
			// Orion.Print('Los');
			targetFlagsValue += '|inlos';
		} 
		Shared.AddVar('targetFlagsGlobal',targetFlagsValue);  // Flags
		if (CustomGumpResponse.Checks().indexOf(16) !== -1)  // Honor
		{  
			// Orion.Print('Honor');
			Shared.AddVar('targetHonorGlobal',true);
		} 
		else
		{
			// Orion.Print('No Honor');
			Shared.AddVar('targetHonorGlobal',false);
		}
	}
	var targetGUIinputText = CustomGumpResponse.Texts();
	if (targetGUIinputText[1].Text().length > 0)
	{
		// Orion.Print('Range value: ' + targetGUIinputText[1].Text());
		targetRangeValue = targetGUIinputText[1].Text();
		var targetRangeInt = parseInt(targetRangeValue);
		if (targetRangeValue >= 0 && targetRangeValue <= 15)
			Shared.AddVar('targetRangeGlobal',targetRangeInt);
		else
			Shared.AddVar('targetRangeGlobal',9);
	}
	else
		Shared.AddVar('targetRangeGlobal',9);
	if (targetGUIinputText[2].Text().length > 0)
	{
		// Orion.Print('Rotation value: ' + targetGUIinputText[2].Text());
		targetRotationValue = targetGUIinputText[2].Text();
		var targetRotationFloat = parseFloat(targetRotationValue);
		if (targetRotationFloat >= .5 && targetRotationFloat <= 5)
			Shared.AddVar('targetRotationGlobal',targetRotationFloat);
		else
			Shared.AddVar('targetRotationGlobal',2);
	}
	else
		Shared.AddVar('targetRotationGlobal',2);
}

function targetGUIcontrols(unused)
{	
	var gumpResponseCode = CustomGumpResponse.ReturnCode();
	// Orion.Print('Custom gump01 response gumpResponseCode = ' + gumpResponseCode);
	if (gumpResponseCode == 1)  // Start
	{
		Orion.Print('Target GUI - Start');
		targetGUIinputCheck();
		if (Orion.ScriptRunning('targetGUIexecutor') || Orion.ScriptRunning('targetGUIexecutorNear'))
			Orion.Terminate('targetGUIexecutor|targetGUIexecutorNear');
		Orion.Exec('targetGUIexecutor');
	}
	else if (gumpResponseCode == 2)  // Pause
	{
		Orion.Print('Target GUI - Pause');
		if (Orion.ScriptRunning('targetGUIexecutor'))
			Orion.PauseScript('targetGUIexecutor');
	} 
	else if (gumpResponseCode == 3)  // Exit
	{
		Orion.Print('Target GUI - Exit');
		var sampireGUIgump = Orion.CreateCustomGump(1422);
		sampireGUIgump.Close();
		var targetGUIgump = Orion.CreateCustomGump(1423);
		targetGUIgump.Close();
		var movementGUIgump = Orion.CreateCustomGump(1424);
		movementGUIgump.Close();
		Orion.Terminate('all');
	} 
	else if (gumpResponseCode == 4)  // Find Friends
	{  
		var targetGraphic = Shared.GetVar('targetGraphicGlobal');
		var targetFlags = 'mobile|ignorefriends|ignoreself' + Shared.GetVar('targetFlagsGlobal');
		var targetNotoriety = 'gray' + Shared.GetVar('targetNotorietyGlobal');
		var friendsFound = Orion.FindType(targetGraphic, -1, 'ground', targetFlags, 10, targetNotoriety);
		var x = 0;
		while (friendsFound.length > x)
		{	
			var friendsFoundObject = Orion.FindObject(friendsFound[x]);
			Orion.AddFriend('NPC: ' + friendsFoundObject.Name(),friendsFound[x]);
			Orion.Print('Friend added: ' + friendsFoundObject.Name());  
			x++;
			Orion.Wait(100);
		}
	}
	else if (gumpResponseCode == 5)  // Add Friend
	{  
		Orion.AddObject('targetFriendObject');
		Orion.WaitForAddObject('targetFriendObject');
		var targetFriend = Orion.FindObject('targetFriendObject');
		if (targetFriend != null)
			Orion.AddFriend('Target Friend',targetFriend.Serial());
	}
	else if (gumpResponseCode == 6)  // Clear Friends
	{  
		Orion.ClearFriendList();
	}
	else { Orion.Print('FML... Custom targetGUIgump serial ' + CustomGumpResponse.Serial()); }  // Nothing
}

function targetGUI()
{	
	var targetGUIgump = Orion.CreateCustomGump(1423);	
	targetGUIgump.SetNoClose(true);
	targetGUIgump.Clear();
	targetGUIgump.SetCallback('targetGUIcontrols');
	targetGUIgump.AddGumpPic(0, 0, '0x4CC');
	var itemSerial = 1;
	targetGUIgump.AddText(153, 5, '0x0037', 'Targeting GUI');
	// Buttons
	targetGUIgump.AddResizepic(45, 37, '0x24EA', 80, 32, itemSerial++, 1);
	targetGUIgump.AddText(67, 43, '0x0045', "<big>Start</big>");
	targetGUIgump.AddResizepic(157, 37, '0x24EA', 80, 32, itemSerial++, 1);
	targetGUIgump.AddText(181, 43, '0x0056', "Pause");
	targetGUIgump.AddResizepic(270, 37, '0x24EA', 80, 32, itemSerial++, 1);
	targetGUIgump.AddText(298, 43, '0x0024', "Exit");
	targetGUIgump.AddResizepic(35, 213, '0x24EA', 90, 32, itemSerial++, 1);
	targetGUIgump.AddText(46, 219, '0', "Find Friends");
	targetGUIgump.AddResizepic(152, 213, '0x24EA', 90, 32, itemSerial++, 1);
	targetGUIgump.AddText(166, 219, '0', "Add Friend");
	targetGUIgump.AddResizepic(270, 213, '0x24EA', 90, 32, itemSerial++, 1);
	targetGUIgump.AddText(277, 219, '0', "Clear Friends");
	// Checkboxes	
	targetGUIgump.AddCheckbox(itemSerial++, 99, 82, '0x00D2', '0x00D2', '0x00D3', 0, '0', '');
	targetGUIgump.AddText(129, 81, '0x0004', 'Blue');
	targetGUIgump.AddCheckbox(itemSerial++, 162, 82, '0x00D2', '0x00D2', '0x00D3', 0, '0', '');
	targetGUIgump.AddText(191, 81, '0x0030', 'Orange');
	targetGUIgump.AddCheckbox(itemSerial++, 238, 82, '0x00D2', '0x00D2', '0x00D3', 0, '0', '');
	targetGUIgump.AddText(267, 81, '0x0024', 'Red');
	targetGUIgump.AddCheckbox(itemSerial++, 295, 82, '0x00D2', '0x00D2', '0x00D3', 0, '0', ' Criminal');
	targetGUIgump.AddCheckbox(itemSerial++, 30, 82, '0x00D2', '0x00D2', '0x00D3', 0, '0', ' Ignore \n Summonable');
	targetGUIgump.AddCheckbox(itemSerial++, 30, 120, '0x00D2', '0x00D2', '0x00D3', 0, '0', ' No EV/ \n Collosus');
	targetGUIgump.AddCheckbox(itemSerial++, 115, 120, '0x00D2', '0x00D2', '0x00D3', 0, '0', ' Near');
	targetGUIgump.AddCheckbox(itemSerial++, 179, 120, '0x00D2', '0x00D2', '0x00D3', 0, '0', ' Human');
	targetGUIgump.AddCheckbox(itemSerial++, 252, 120, '0x00D2', '0x00D2', '0x00D3', 0, '0', ' Los');
	targetGUIgump.AddCheckbox(itemSerial++, 309, 120, '0x00D2', '0x00D2', '0x00D3', 0, '0', ' Honor');
	// Text Inputs
	targetGUIgump.AddText(113, 152, '0', 'Hp Stop:');
	targetGUIgump.AddResizepic(170, 153, '0x0BB8', 100, 21);  
	targetGUIgump.AddTextEntry(itemSerial++, 175, 154, '0x0BB8', '', 100, 20);
	targetGUIgump.SetTextEntryPlaceholderText(' 0 to 80');
	targetGUIgump.AddText(40, 184, '0', 'Range:');
	targetGUIgump.AddResizepic(82, 183, '0x0BB8', 100, 21);
	targetGUIgump.AddTextEntry(itemSerial++, 87, 184, '0x0BB8', '', 100, 20);
	targetGUIgump.SetTextEntryPlaceholderText(' 0 to 15');
	targetGUIgump.AddText(197, 184, '0', 'Rotation:');
	targetGUIgump.AddResizepic(255, 183, '0x0BB8', 100, 21);
	targetGUIgump.AddTextEntry(itemSerial++, 260, 184, '0x0BB8', '', 100, 20);
	targetGUIgump.SetTextEntryPlaceholderText(' .5 to 5.0');

	targetGUIgump.Select('targetGUIgump');
	targetGUIgump.Update();
}

function movementGUIcontrols(unused)
{
	var gumpResponseCode = CustomGumpResponse.ReturnCode();
	// Orion.Print('Custom gump01 response gumpResponseCode = ' + gumpResponseCode);
	if (gumpResponseCode == 1) {  }  // Start
	else if (gumpResponseCode == 2) {  }  // Pause
	else if (gumpResponseCode == 3)  // Exit
	{
		var sampireGUIgump = Orion.CreateCustomGump(1422);
		sampireGUIgump.Close();
		var targetGUIgump = Orion.CreateCustomGump(1423);
		targetGUIgump.Close();
		var movementGUIgump = Orion.CreateCustomGump(1424);
		movementGUIgump.Close();
		Orion.Terminate('all');
	} 
	else if (gumpResponseCode == 4) {  }  // 
	else if (gumpResponseCode == 5) {  }  // 
	else if (gumpResponseCode == 6) {  }  // 
	else if (gumpResponseCode == 7) {  }  // 
	else { Orion.Print('FML... Custom movementGUIgump serial ' + CustomGumpResponse.Serial()); }  // Nothing
}

function movementGUI()
{
	var movementGUIgump = Orion.CreateCustomGump(1424);
	movementGUIgump.SetNoClose(true);
	movementGUIgump.Clear();
	movementGUIgump.SetCallback('movementGUIcontrols');
	movementGUIgump.AddGumpPic(0, 0, '0x4CC');
	var itemSerial = 1;
	movementGUIgump.AddText(153, 5, '0x0037', 'Movement GUI');
	// Buttons
	movementGUIgump.AddResizepic(45, 34, '0x24EA', 80, 32, itemSerial++, 1);
	movementGUIgump.AddText(68, 40, '0x0045', "Start");
	movementGUIgump.AddResizepic(157, 34, '0x24EA', 80, 32, itemSerial++, 1);
	movementGUIgump.AddText(181, 40, '0x0056', "Pause");
	movementGUIgump.AddResizepic(270, 34, '0x24EA', 80, 32, itemSerial++, 1);
	movementGUIgump.AddText(298, 40, '0x0024', "Exit");
	movementGUIgump.AddResizepic(35, 111, '0x24EA', 100, 32, itemSerial++, 1);
	movementGUIgump.AddText(56, 117, '0', "Add Point");
	movementGUIgump.AddResizepic(148, 111, '0x24EA', 100, 32, itemSerial++, 1);
	movementGUIgump.AddText(159, 117, '0', "Remove Point");
	movementGUIgump.AddResizepic(260, 111, '0x24EA', 100, 32, itemSerial++, 1);
	movementGUIgump.AddText(274, 117, '0', "Clear Points");
	// Text entry
	movementGUIgump.AddText(50, 80, '0', "Move Timer: ");
	movementGUIgump.AddResizepic(128, 79, '0x0BB8', 80, 21);
	movementGUIgump.AddTextEntry(itemSerial++, 133, 80, '0x0BB8', '', 80, 20);	
	movementGUIgump.SetTextEntryPlaceholderText(' 1 to 30');
	// Checkboxes
	movementGUIgump.AddCheckbox(itemSerial++, 230, 79, '0x00D2', '0x00D2', '0x00D3', 0, '0', 'Ignore Targets');
	// List of points
	movementGUIgump.AddResizepic(38, 153, '0x0BB8', 320, 115);
	
	movementGUIgump.Select('movementGUIgump');
	movementGUIgump.Update();
}