var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var DataService = /** @class */ (function () {
    function DataService(http) {
        this.http = http;
        this.categoriesUrl = "/Categories";
        this.subcategoriesUrl = "/Categories/Subcategories/";
        this.wordsUrl = "Categories/Subcategories/Words/";
        this.testsUrl = "Categories/Subcategories/Tests";
    }
    DataService.prototype.getCategories = function () {
        return this.http.get(this.categoriesUrl);
    };
    DataService.prototype.getSubcategories = function (parentId) {
        return this.http.get(this.subcategoriesUrl + parentId);
    };
    DataService.prototype.getWords = function (subcategoryId) {
        return this.http.get(this.wordsUrl + subcategoryId);
    };
    DataService.prototype.getTests = function () {
        return this.http.get(this.testsUrl);
    };
    DataService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], DataService);
    return DataService;
}());
export { DataService };
//# sourceMappingURL=data.service.js.map