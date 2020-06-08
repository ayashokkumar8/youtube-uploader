const BreadcrumbNameMap: Record<string, string> = {
};


export function getBreads(pathname: string){
    const segments = pathname.replace("//d.*/", "").split("/").filter(x => x);
    let breads = [];
  
    if(segments.length === 0){
      breads.push("Home");
    } else {
      for(let i=0; i<segments.length; i++){
        const to = `/${segments.slice(0, i + 1).join("/")}`;
        const bread = BreadcrumbNameMap[to];
        if(bread){
          breads.push(bread);
        }
      }
    }
    return breads;
  }