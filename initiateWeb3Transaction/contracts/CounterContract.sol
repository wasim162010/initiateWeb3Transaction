pragma solidity ^0.5.16;

contract CounterContract{

uint incVar;
event incrEvent(uint _value); //incremenrt

function initializer()  public {
  incVar =0;
}

function increment()  public {
  incVar = incVar + 1;
  emit incrEvent(incVar);  
}

function reset()  public returns(string memory) {
  incVar = 0;
  return "incVar has been reset to zero";
}

function fetchCurrentValue()  view public returns(uint) {
  return incVar;
 
}



}