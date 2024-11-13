function concatRegExps( regExps:RegExp[], flags?:string ): RegExp{
	return new RegExp(
		regExps.reduce((acc,cur)=>acc + cur.source,""),
		flags,
	);
}

export { concatRegExps };