export interface IPresenter<TModel> {
    Present(model: TModel): void;
}
