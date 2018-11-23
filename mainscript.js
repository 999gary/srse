//arrays start at 0
var lvl;
var cloc;
var gold;
var exp;
var metaclasses = [];
var inventory = [];
var world = [];

var classes = Jc; //[0, "Boxer", "Gladiator", "Sniper", "Magician", "Priest", "Gunner", "Whipper", "Angel"]

function extract(a)
{
  var infoarray = GameInfo().split('|');
  console.log(infoarray);
  lvl = JSON.parse(infoarray[19])[0];
  cloc = JSON.parse(infoarray[20]);
  gold = JSON.parse(infoarray[16]);
  exp = JSON.parse(infoarray[17]);
  for(var i = 0; i<4; i++)
  {
    metaclasses[i] = {};
    metaclasses[i]["Name"] = classes[JSON.parse(infoarray[0])[i]];
    metaclasses[i]["ID"] = JSON.parse(infoarray[0])[i];
    metaclasses[i]["Current LP"] = JSON.parse(infoarray[1])[i];
    metaclasses[i]["SP in LP"] = JSON.parse(infoarray[2])[i];
    metaclasses[i]["SP in STR"] = JSON.parse(infoarray[3])[i];
    metaclasses[i]["SP in DEX"] = JSON.parse(infoarray[4])[i];
    metaclasses[i]["SP in MAG"] = JSON.parse(infoarray[5])[i];
    metaclasses[i]["Unspent SP"] = JSON.parse(infoarray[18])[i];
    metaclasses[i]["Current Weapon ID"] = JSON.parse(infoarray[6])[i+4];
    metaclasses[i]["Current Weapon Name"] = u[JSON.parse(infoarray[6])[i+4]][0];
    metaclasses[i]["Compo Item 1 ID"] = JSON.parse(infoarray[7])[i+4];
    metaclasses[i]["Compo Item 1 Name"] = u[JSON.parse(infoarray[7])[i+4]][0];
    metaclasses[i]["Compo Item 2 ID"] = JSON.parse(infoarray[8])[i+4];
    metaclasses[i]["Compo Item 2 Name"] = u[JSON.parse(infoarray[8])[i+4]][0];
  }
  for(var j = 0; j<24; j++)
  {
    inventory[j] = {}
    inventory[j]["Item ID"] = JSON.parse(infoarray[6])[j+16];
    inventory[j]["Item Name"] = u[JSON.parse(infoarray[6])[j+16]][0];
    inventory[j]["Compo 1 ID"] = JSON.parse(infoarray[7])[j+16];
    inventory[j]["Compo 1 Name"] = u[JSON.parse(infoarray[7])[j+16]][0];
    inventory[j]["Compo 2 ID"] = JSON.parse(infoarray[8])[j+16];
    inventory[j]["Compo 2 Name"] = u[JSON.parse(infoarray[8])[j+16]][0];
  }
  for(var o = 0; o<Uf.length; o++)
  {
    world[o] = {};
    world[o]["Stage Name"] = Uf[o];
    world[o]["Stage ID"] = o;
    world[o]["Stage Status"] = JSON.parse(infoarray[15])[o];
  }
  console.log(world)
  console.log(metaclasses)
  console.log(inventory)
  loadWorldStuff();
  for(var p = 0; p<4; p++)
  {
    document.getElementById("s"+(p+1)+"c").value = metaclasses[p]["ID"];
    document.getElementById("s"+(p+1)+"lp").value = metaclasses[p]["Current LP"];
    document.getElementById("s"+(p+1)+"splp").value = metaclasses[p]["SP in LP"];
    document.getElementById("s"+(p+1)+"spstr").value = metaclasses[p]["SP in STR"];
    document.getElementById("s"+(p+1)+"spdex").value = metaclasses[p]["SP in DEX"];
    document.getElementById("s"+(p+1)+"spmag").value = metaclasses[p]["SP in MAG"];
    document.getElementById("s"+(p+1)+"unspentsp").value = metaclasses[p]["Unspent SP"];
  }
  for( var lo = 0; lo<Uf.length; lo++ )
  {
    document.getElementById("stage"+(lo+1)).value = world[lo]["Stage Status"];
  }
  document.getElementById("lvl").value = lvl
  document.getElementById("cloc").value = cloc
  document.getElementById("gold").value = gold
  document.getElementById("exp").value = exp
}
function worldChange(a)
{
  var o = [0, 1, 3, 7]
  for(var p = 0; p<Uf.length; p++)
  {
    world[p]["Stage Status"] = o[a];
    document.getElementById("stage"+(p+1)).value = world[p]["Stage Status"];
  }
}
function updateAll()
{
  getValues();
  for(var p = 0; p<4; p++)
  {
    var totalsp = (lvl-1)*2;
    var spentsp = (metaclasses[p]["SP in LP"] + metaclasses[p]["SP in STR"] + metaclasses[p]["SP in DEX"] + metaclasses[p]["SP in MAG"]);
    if(spentsp != totalsp)
    {
      metaclasses[p]["Unspent SP"] = (totalsp - spentsp);
      document.getElementById("s"+(p+1)+"unspentsp").value = metaclasses[p]["Unspent SP"];
    }
    else
    {
      document.getElementById("s"+(p+1)+"unspentsp").value = 0;
    }
  }

}

function getValues()
{
  for(var p = 0; p<4; p++)
  {
    metaclasses[p]["ID"] = Number(document.getElementById("s"+(p+1)+"c").value)
    metaclasses[p]["Current LP"] = Number(document.getElementById("s"+(p+1)+"lp").value)
    metaclasses[p]["SP in LP"] = Number(document.getElementById("s"+(p+1)+"splp").value)
    metaclasses[p]["SP in STR"] = Number(document.getElementById("s"+(p+1)+"spstr").value)
    metaclasses[p]["SP in DEX"] = Number(document.getElementById("s"+(p+1)+"spdex").value)
    metaclasses[p]["SP in MAG"] = Number(document.getElementById("s"+(p+1)+"spmag").value)
    metaclasses[p]["Unspent SP"] = Number(document.getElementById("s"+(p+1)+"unspentsp").value)
  }
  for( var lo = 0; lo<Uf.length; lo++ )
  {
    world[lo]["Stage Status"] = Number(document.getElementById("stage"+(lo+1)).value);
  }
  lvl = Number(document.getElementById("lvl").value)
  cloc = Number(document.getElementById("cloc").value)
  gold = Number(document.getElementById("gold").value)
  exp = Number(document.getElementById("exp").value)
}

function implant()
{
  getValues();
  var array = [];
  array[0] = [];
  array[1] = [];
  array[2] = [];
  array[3] = [];
  array[4] = [];
  array[5] = [];
  array[6] = [0,0,0,0];
  array[7] = [0,0,0,0];
  array[8] = [0,0,0,0];
  array[9] = [];
  array[10] = 0; //TODO: add changable variables
  array[11] = 1;
  array[12] = 0;
  array[13] = 0;
  array[14] = 1;
  array[15] = [];
  array[16] = gold;
  array[17] = exp;
  array[18] = [];
  array[19] = [lvl,1];
  array[20] = cloc;
  for(var i = 0; i<8; i++)
  {
    if(i<4)
    {
      array[0][i] = metaclasses[i]["ID"];
      array[1][i] = metaclasses[i]["Current LP"];
      array[2][i] = metaclasses[i]["SP in LP"];
      array[3][i] = metaclasses[i]["SP in STR"];
      array[4][i] = metaclasses[i]["SP in DEX"];
      array[5][i] = metaclasses[i]["SP in MAG"];
      array[6][i+4] = metaclasses[i]["Current Weapon ID"];
      array[7][i+4] = metaclasses[i]["Compo Item 1 ID"];
      array[8][i+4] = metaclasses[i]["Compo Item 2 ID"];
      array[9][i] = 1;
      array[18][i] = metaclasses[i]["Unspent SP"];
    }
    else
    {
      array[0][i] = 0;
      array[1][i] = 50;
      array[2][i] = 0;
      array[3][i] = 0;
      array[4][i] = 0;
      array[5][i] = 0;
      array[6][i+4] = 0;
      array[6][i+8] = 0;
      array[7][i+4] = 0;
      array[7][i+8] = 0;
      array[8][i+4] = 0;
      array[8][i+8] = 0;
      array[9][i] = 1;
      array[18][i] = 0;
    }
  }
  for(var j = 0; j<24; j++)
  {
    array[6][j+16] = inventory[j]["Item ID"];
    array[7][j+16] = inventory[j]["Compo 1 ID"];
    array[8][j+16] = inventory[j]["Compo 2 ID"];
  }
    array[6][array[6].length] = 0;
    array[7][array[7].length] = 0;
    array[8][array[8].length] = 0;
  for(var o = 0; o<Uf.length; o++)
  {
    array[15][o] = world[o]["Stage Status"];
  }
  console.log(array);
  var ss = "";
  ss += JSON.stringify(array[0])
  ss += "|"
  ss += JSON.stringify(array[1])
  ss += "|"
  ss += JSON.stringify(array[2])
  ss += "|"
  ss += JSON.stringify(array[3])
  ss += "|"
  ss += JSON.stringify(array[4])
  ss += "|"
  ss += JSON.stringify(array[5])
  ss += "|"
  ss += JSON.stringify(array[6])
  ss += "|"
  ss += JSON.stringify(array[7])
  ss += "|"
  ss += JSON.stringify(array[8])
  ss += "|"
  ss += JSON.stringify(array[9])
  ss += "|"
  ss += JSON.stringify(array[10])
  ss += "|"
  ss += JSON.stringify(array[11])
  ss += "|"
  ss += JSON.stringify(array[12])
  ss += "|"
  ss += JSON.stringify(array[13])
  ss += "|"
  ss += JSON.stringify(array[14])
  ss += "|"
  ss += JSON.stringify(array[15])
  ss += "|"
  ss += JSON.stringify(array[16])
  ss += "|"
  ss += JSON.stringify(array[17])
  ss += "|"
  ss += JSON.stringify(array[18])
  ss += "|"
  ss += JSON.stringify(array[19])
  ss += "|"
  ss += JSON.stringify(array[20])
  console.log(ss);
  GameLoader(ss)
  var savestring = se(0);
  Ne();
  if(C==null)
  {
    alert("You fucked up, anticheat triggered, please refresh the page");
  }
  console.log(savestring);
  document.getElementById("name2").value = savestring;
  return savestring;
}
window.GameInfo = stringGet;

function stringGet()
{
		var mainSaveString = "";
	    mainSaveString += JSON.stringify(ec); //classes
        mainSaveString += "|";
        mainSaveString += JSON.stringify(p); //Current Health
        mainSaveString += "|";
        mainSaveString += JSON.stringify(gc); //points in LP
        mainSaveString += "|";
        mainSaveString += JSON.stringify(hc); //points in STR
        mainSaveString += "|";
        mainSaveString += JSON.stringify(ic); //points in DEX
        mainSaveString += "|";
        mainSaveString += JSON.stringify(jc); //points in MAG
        mainSaveString += "|";
        mainSaveString += JSON.stringify(q); //inventory slots
        mainSaveString += "|";
        mainSaveString += JSON.stringify(Dc); //1st compo
        mainSaveString += "|";
        mainSaveString += JSON.stringify(Ec); //2nd compo
        mainSaveString += "|";
        mainSaveString += JSON.stringify(uc); //stickmen on/off
        mainSaveString += "|";
        mainSaveString += JSON.stringify(vc); //move of dying
        mainSaveString += "|";
        mainSaveString += JSON.stringify(wc); //damage effect
        mainSaveString += "|";
        mainSaveString += JSON.stringify(xc); //lp bar
        mainSaveString += "|";
        mainSaveString += JSON.stringify(yc); //PL symbol
        mainSaveString += "|";
        mainSaveString += JSON.stringify(zc); //drag deadbody
        mainSaveString += "|";
        mainSaveString += JSON.stringify(Ae); //stage status
        mainSaveString += "|";
        mainSaveString += JSON.stringify(dc); //money
        mainSaveString += "|";
        mainSaveString += JSON.stringify(cc); //exp
        mainSaveString += "|";
        mainSaveString += JSON.stringify(ac);//remaining uninvested sp
        mainSaveString += "|";
        mainSaveString += JSON.stringify(Mb);//level
		mainSaveString += "|";
		mainSaveString += JSON.stringify(h);//current location
		return mainSaveString;
}
function GameLoader(a)
{
	var f = a.split("|")
	console.log( f )
	ec = JSON.parse( f[0] );
	p = JSON.parse( f[1] );
	gc = JSON.parse( f[2] );
	hc = JSON.parse( f[3] );
	ic = JSON.parse( f[4] );
	jc = JSON.parse( f[5] );
	q = JSON.parse( f[6] );
	Dc = JSON.parse( f[7] );
	Ec = JSON.parse( f[8] );
	uc = JSON.parse( f[9] );
	vc = JSON.parse( f[10] );
	wc = JSON.parse( f[11] );
	xc = JSON.parse( f[12] );
	yc = JSON.parse( f[13] );
	zc = JSON.parse( f[14] );
	Ae = JSON.parse( f[15] );
	dc = JSON.parse( f[16] );
	cc = JSON.parse( f[17] );
	ac = JSON.parse( f[18] );
	Mb = JSON.parse( f[19] );
	h = JSON.parse( f[20] );
	0 < je ? ke = 50 : he = se(0);
	te()
}
