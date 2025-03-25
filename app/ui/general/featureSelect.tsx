'use client'

import { updateFeatures } from "@/app/lib/dbConnection"
import { toCapitalized } from "@/app/lib/miniFuncs"
import { useState } from "react"

type Feature = {feature: string, value: boolean}

export default function FeatureSelect({featureList} : {featureList: Feature[]}) {
    const [features, setFeatures] = useState<Feature[]>(featureList)

    return(
        <div className="min-w-[250px] w-[300px] max-h-[580px] bg-white shadow-sm rounded-lg p-10 flex flex-col">
            <h2 className="text-[#05004E] text-xl mb-4">Feature Auswahl</h2>
            <div className="flex flex-col overflow-auto scrollbar-none mb-8 gap-4">
                {
                    features.map((element, index) => (
                        <div key={element.feature} className="flex w-auto bg-gray-200 p-4 rounded-md justify-between">
                            <span>{toCapitalized(element.feature)}</span>
                            <input type="checkbox" className="toggle toggle-success" checked={element.value} onChange={(e) => {
                                setFeatures((prev) => {
                                    var updatedFeatures = [...prev]
                                    updatedFeatures[index] = {feature: element.feature, value: e.target.checked}
                                    return(updatedFeatures)
                                })
                            }}/>
                        </div>
                    ))
                }
            </div>
            <div className="flex justify-between mt-auto">
                <button className="btn" onClick={(e) => {
                    e.preventDefault();
                    setFeatures(featureList)
                }}>Reset</button>
                <button className="btn" onClick={async (e) => {
                    e.preventDefault();
                    await updateFeatures(features);
                }}>Speichern</button>
            </div>
        </div>
    )
}