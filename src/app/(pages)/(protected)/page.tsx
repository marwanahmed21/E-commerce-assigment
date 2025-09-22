import HomeSlider from "@/components/HomeSlider/HomeSlider";
import Products from "./product/page";
import CategorySlider from "@/components/CategorySlider/CategorySlider";

export default function page() {
    return (
        <>
            <HomeSlider />
            <CategorySlider />
            <Products />
        </>
    );
}
