import List "mo:core/List";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Nat "mo:core/Nat";

actor {
  type ResourceItem = {
    title : Text;
    description : Text;
    url : Text;
    tag : Text;
  };

  type ResourceCategory = {
    name : Text;
    description : Text;
    items : [ResourceItem];
  };

  type CircleScore = {
    percentage : Nat;
    timestamp : Time.Time;
  };

  func compareScores(s1 : CircleScore, s2 : CircleScore) : Order.Order {
    Nat.compare(s2.percentage, s1.percentage);
  };

  let categories = List.empty<ResourceCategory>();
  let circleScores = List.empty<CircleScore>();

  public shared ({ caller }) func addCategory(name : Text, description : Text) : async () {
    let newCategory : ResourceCategory = {
      name;
      description;
      items = [];
    };
    categories.add(newCategory);
  };

  public shared ({ caller }) func addItemToCategory(categoryIndex : Nat, title : Text, description : Text, url : Text, tag : Text) : async () {
    if (categoryIndex >= categories.size()) {
      Runtime.trap("Category index out of bounds");
    };

    let item : ResourceItem = {
      title;
      description;
      url;
      tag;
    };

    let categoriesArray = categories.toArray();
    let category = categoriesArray[categoryIndex];
    let itemsList = List.fromArray<ResourceItem>(category.items);
    itemsList.add(item);
    let updatedCategory : ResourceCategory = {
      name = category.name;
      description = category.description;
      items = itemsList.toArray();
    };

    let newCategoriesArray : [ResourceCategory] = Array.tabulate(
      categoriesArray.size(),
      func(i) {
        if (i == categoryIndex) { updatedCategory } else { categoriesArray[i] };
      },
    );

    categories.clear();
    categories.addAll(newCategoriesArray.values());
  };

  public query ({ caller }) func getCategories() : async [ResourceCategory] {
    categories.toArray();
  };

  public shared ({ caller }) func submitCircleScore(percentage : Nat) : async () {
    let score : CircleScore = {
      percentage;
      timestamp = Time.now();
    };
    circleScores.add(score);
  };

  public query ({ caller }) func getTopCircleScores(limit : Nat) : async [CircleScore] {
    let sortedScores = circleScores.toArray().sort(compareScores);
    let len = sortedScores.size();
    if (len < limit) {
      sortedScores;
    } else {
      Array.tabulate(limit, func(i) { sortedScores[i] });
    };
  };
};
