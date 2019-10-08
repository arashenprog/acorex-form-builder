import { Injectable } from "@angular/core";
import { PromisResult, MenuItem, AXNavigator } from "acorex-ui";
import { AXNavMenuService } from "acorex-spa";

@Injectable()
export class NavMenuService extends AXNavMenuService {
  static ITEMS: MenuItem[] = [
    {
      id: "0",
      name: "dashboard",
      text: "داشبورد",
      icon: "fas fa-tachometer-alt",
      visible: true
    },
    {
      id: "1",
      name: "dashboard",
      text: "منو درختی",
      icon: "fas fa-tachometer-alt",
      visible: true
    },
    {
      id: "1_1",
      parentId: "1",
      name: "dashboard",
      text: "زیر منو 1",
      icon: "fas fa-tachometer-alt",
      visible: true
    }
  ];

  constructor(private nav: AXNavigator) {
    super();
  }

  register(items: MenuItem[]): void {
    NavMenuService.ITEMS.push(...items);
  }

  getItems(): PromisResult<MenuItem[]> {
    return new PromisResult(resolve => {
      resolve(NavMenuService.ITEMS);
    });
  }
  getFavorites(): PromisResult<MenuItem[]> {
    return new PromisResult(resolve => {
      let favs: string[] = localStorage.getItem("favs")
        ? JSON.parse(localStorage.getItem("favs"))
        : [];
      resolve(NavMenuService.ITEMS.filter(c => favs.includes(c.id)));
    });
  }

  setFavorites(menu: MenuItem, value: boolean): PromisResult<boolean> {
    let favs: string[] = localStorage.getItem("favs")
      ? JSON.parse(localStorage.getItem("favs"))
      : [];
    if (value) {
      if (!favs.some(c => c == menu.id)) {
        favs.push(menu.id);
      }
    } else {
      favs = favs.filter(c => c != menu.id);
    }
    localStorage.setItem("favs", JSON.stringify(favs));
    return PromisResult.resolve(true);
  }

  search(search: string): PromisResult<MenuItem[]> {
    return new PromisResult(resolve => {
      resolve(
        NavMenuService.ITEMS.filter(c =>
          c.text.toLowerCase().includes(search.toLowerCase())
        )
      );
    });
  }

  clickItem(item: MenuItem): PromisResult<boolean> {
    return new PromisResult(resolve => {
      if (item.data.path)
        this.nav.navigate({
          title: item.text,
          path: item.data.path
        });
      resolve(true);
    });
  }
}
