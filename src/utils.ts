function concatRegExps( regExps:RegExp[], flags?:string ): RegExp{
	return new RegExp(
		regExps.reduce((acc,cur)=>acc + cur.source,""),
		flags,
	);
}

function accept(tokens,...cs): string | number | null{
  if(
    tokens.length === 0||
    !cs.includes(tokens[0])
  ) return null;
 
  return tokens.shift();
}

export { concatRegExps, accept };